import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  userData = {
    email: '',
    password: ''
  };

  constructor(private authService: UserService, private router: Router) {}
  NgOnInit():void{
    localStorage.removeItem('jwt');}

  login(userData: any): void {
    this.authService.login(userData).subscribe({
      next: (response: any) => {
        const token = response.token; // Assuming the token comes in the 'token' field
        if (token) {
          localStorage.setItem('jwt', token); // Save the JWT token in localStorage
          console.log('Login successful, redirecting...');
          this.router.navigate(['/dashbord']); // Redirect to dashboard
        } else {
          alert('Login failed. Please check your credentials.');
        }
      },
      error: (error) => {
        console.error('Error during login:', error);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}

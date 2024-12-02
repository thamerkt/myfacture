import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Required for ngModel to work
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/Core/models/user.model';
import { UserService } from 'src/app/Core/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], // Importing CommonModule for ngModel
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  errorr: string | undefined; // To store error messages
  
  userData: User = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private authService: UserService) {}
  isFormValid(): boolean {
    return (
      this.userData.password === this.userData.confirmPassword
    );
  }
  

  signUp(): void {

    if(!this.isFormValid){
      this.errorr="the password and comfirm password doesn't match"
    }
    else{
    this.authService.register(this.userData).subscribe({
      next: (response) => {
        console.log('User registered:', response);
        alert('Registration successful!');
      },
      error: (error) => {
        console.error('Error:', error);
        const errorMessage =
        error?.error?.message || // Check for a detailed error message in response
        error?.message || // Check for a general HTTP error message
        'Registration failed. Please try again.'; // Default fallback message

        this.errorr = errorMessage; // Assigning error message to errorr
      },
    });
  }}
}

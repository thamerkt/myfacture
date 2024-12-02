import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Core/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private authService: UserService, private router: Router) {
    this.logout();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        localStorage.removeItem('jwt'); 
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        console.error('Error during logout:', err);
        alert('Logout failed!');
      },
    });
  }

}

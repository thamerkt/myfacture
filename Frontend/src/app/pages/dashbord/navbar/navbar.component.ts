import { Component } from '@angular/core';
import { UserService } from 'src/app/Core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public authservice:UserService){}

}

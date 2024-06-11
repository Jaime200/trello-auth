import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  user: User | null = null
  constructor(
    private autService: AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {
       this.autService.profile().subscribe({
      next: (user) =>{
        this.user = user
      },
      error: ()=>{
        
      }
    })  
  }


  logout(){
    this.autService.logout()
    this.router.navigate(['/login'])
  }
}

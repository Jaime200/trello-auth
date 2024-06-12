import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service'
import { AuthService } from '@services/auth.service'
import { User } from '@models/user.model';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit  {

  dataSource = new DataSourceUser<User>();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: User | null = null
  constructor(
    private usersService: UsersService,
    private autService: AuthService
  ) {
    
  }
  ngOnInit(): void {
    this.usersService.getUser().subscribe({
      next: (users) => {
        this.dataSource.init(users)
      },
      error : () =>{

      }
    })

      this.autService.user$.subscribe({
      next: (user)=>{
        this.user = user
      }
    });
  }

}

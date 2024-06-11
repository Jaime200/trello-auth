import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service'
import { User } from '@models/user.model';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit  {

  dataSource = new DataSourceUser<User>();
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  constructor(
    private usersService: UsersService
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
  }

}

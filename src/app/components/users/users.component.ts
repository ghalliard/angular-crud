import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.mode';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'lastname', 'age', 'birthday'];
  users: User[] = [];

  constructor(
    private userService: UserService
  ){

  }

  ngOnInit(): void {
    this.userService.getAllUsers()
    .subscribe(data =>{
      this.users = data;
      this.users.forEach(item =>{
        item.birth = this.userService.getBirth(item.birth);
      })
    });
  }

}

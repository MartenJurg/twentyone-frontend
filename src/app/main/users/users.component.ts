import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services/user.service";
import {TokenStorageService} from "../../_services/token-storage.service";
import {User} from "../../_pojos/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }
  users;

  ngOnInit() {
    this.userService.getUsers().subscribe( data => {
      this.users = data;
      console.log(data);
    });

  }

}

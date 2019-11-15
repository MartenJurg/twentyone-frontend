import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  username = "";

  constructor(
    private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getLoggedIn() == "loggedin") {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUsername();
    }
  }

}

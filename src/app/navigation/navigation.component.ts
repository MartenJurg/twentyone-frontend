import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  isLoggedIn = false;
  username = "";

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getLoggedIn()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUsername();
    }
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}

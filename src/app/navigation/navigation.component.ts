import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isAdmin = false;
  isLoggedIn = false;
  username = "";

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    console.log(this.tokenStorage.getAuthority());
    console.log(this.tokenStorage.getUsername());
    if (this.tokenStorage.getLoggedIn()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUsername();
      if (this.tokenStorage.getAuthority() == "ROLE_ADMIN") {
        this.isAdmin = true;
      }
    }
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}

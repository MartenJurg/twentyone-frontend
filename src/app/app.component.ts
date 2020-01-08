import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./_services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Twentyone';


  isLoggedIn = false;
  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    if (this.tokenStorage.getLoggedIn() == "loggedin") {
      this.isLoggedIn = true;
    }
  }


}

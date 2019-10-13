import { Component, OnInit } from '@angular/core';
import {LoginInfo} from "../auth/login_info";
import {AuthService} from "../auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {UserService} from "../user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  private loginInfo: LoginInfo;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  username = "";

  constructor(private userService: UserService, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getLoggedIn()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUsername();
    }
  }

  onSubmit() {
    this.loginInfo = new LoginInfo(this.form.username, this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveLoggedIn("loggedin")
        this.username = data.username;
        //this.tokenStorage.saveAuthorities(data.authorities);

        this.reloadPage()
        console.log("hallo");
      },
      error => {
        this.errorMessage = error.error.message;
      })
  }

  reloadPage() {
    window.location.reload();
  }

}

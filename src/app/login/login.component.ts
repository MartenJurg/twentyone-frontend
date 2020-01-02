import { Component, OnInit } from '@angular/core';
import {LoginInfo} from "../auth/login_info";
import {AuthService} from "../auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {DataInfo} from "../data/data_info";
import {SkillingService} from "../skilling.service";
import {DataComponent} from "../data/data.component";


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
  data: DataInfo;

  constructor(private userService: UserService,
              private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private skillService: SkillingService,
              private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getLoggedIn() == "loggedin") {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUsername();
    }
  }

  createData() {
    this.skillService.getInventory(this.username).subscribe(
      data=> {
        this.tokenStorage.saveInventory(data);
      }
    )
    this.skillService.getData(this.tokenStorage.getUsername()).subscribe(
      data => {
        this.data = data;
        this.tokenStorage.saveData(data);
      }
    );
  }

  onSubmit() {
    this.loginInfo = new LoginInfo(this.form.username, this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authority);
        this.tokenStorage.saveLoggedIn("loggedin")
        this.username = data.username;
        this.createData();
        //this.tokenStorage.saveAuthorities(data.authorities);
        this.locateToHome();
        this.createData();
        setTimeout(() =>
          {
            this.router.navigate(['/home']);
          },
          500);
      },
      error => {
        this.isLoginFailed = true;
        this.errorMessage = error.error.message;
      })
  }

  locateToHome() {
    window.location.assign("/");

  }



}

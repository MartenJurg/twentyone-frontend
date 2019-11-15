import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {SignUpInfo} from "../auth/signup_info";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  private signUpInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService) { }

  ngOnInit() {

  }

  onSubmit() {
    this.signUpInfo = new SignUpInfo(this.form.name, this.form.username, this.form.email, this.form.password);
    this.authService.signUp(this.signUpInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        window.location.assign("/login");
      },
      error => {
        this.isSignedUp = false;
        this.isSignUpFailed = true;
        this.errorMessage = error.error.errorMessage;
      }
    )

  }

}

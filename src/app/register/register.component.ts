import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {SignupForm} from "../_pojos/signupform";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private tokenStorage: TokenStorageService,
              private userService: UserService,
              private router: Router,
  ) { }

  signupForm: SignupForm;

  ngOnInit() {


  }

  onSubmit() {

    this.signupForm = new SignupForm(this.form.name, this.form.username, this.form.email, this.form.password);

    this.userService.signUp(this.signupForm)
      .pipe(first())
      .subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      error => {
        this.isSignedUp = false;
        this.isSignUpFailed = true;
        this.errorMessage = error.error.errorMessage;
      }
    )

  }

}

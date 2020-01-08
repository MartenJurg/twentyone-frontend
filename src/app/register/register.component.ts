import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


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
  registerForm: FormGroup;

  constructor(private tokenStorage: TokenStorageService,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit() {

    this.userService.signUp(this.registerForm.value)
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

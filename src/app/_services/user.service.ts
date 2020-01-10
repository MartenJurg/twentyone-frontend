import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../_pojos/user";
import {HttpClient} from "@angular/common/http";
import {SignupForm} from "../_pojos/signupform";

@Injectable({
  providedIn: "root"
})

export class UserService {


  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("api/users");
  }

  attemptAuth(user: User): Observable<User> {
    return this.http.post<User>("/api/auth/login", user);
  }

  signUp(signUpInfo: SignupForm): Observable<string> {
    return this.http.post<string>("/api/auth/signup", signUpInfo);
  }

  logout(): Observable<string> {
    return this.http.post<string>("/api/logout", "logout");
  }
}

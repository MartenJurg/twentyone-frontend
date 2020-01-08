import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../_pojos/user";
import {HttpClient} from "@angular/common/http";

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

  signUp(user: User): Observable<User> {
    return this.http.post<User>("/api/auth/signup", user);
  }
}

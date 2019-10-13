import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {User} from "./user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class UserServise {


  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("api/users");
  }
}

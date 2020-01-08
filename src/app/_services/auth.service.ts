import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "./user.service";
import {User} from "../_pojos/user";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private userService : UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject ? this.currentUserSubject.value : undefined;
  }


  login(username, password) {
    return this.userService.attemptAuth({username, password} as User)
      .pipe(map((user: User) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('token', user.token);
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}

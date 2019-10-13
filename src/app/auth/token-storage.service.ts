import {Injectable} from "@angular/core";

const USERNAME_KEY = 'AuthUsername';
const AUTHORITY_KEY = 'AuthAuthorities';
const ISLOGGEDIN_KEY = 'IsLoggedIn';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveLoggedIn(loggedIn: string) {
    window.sessionStorage.removeItem(ISLOGGEDIN_KEY);
    window.sessionStorage.setItem(ISLOGGEDIN_KEY, loggedIn);
  }

  public getLoggedIn(): string {
    return sessionStorage.getItem(ISLOGGEDIN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authority: string) {
    window.sessionStorage.removeItem(AUTHORITY_KEY);
    window.sessionStorage.setItem(AUTHORITY_KEY, authority);
  }

  public getAuthority(): string {
    return sessionStorage.getItem(AUTHORITY_KEY);
  }

}

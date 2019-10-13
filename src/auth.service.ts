import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignUpInfo} from "./app/auth/signup_info";
import {LoginInfo} from "./app/auth/login_info";
import {JwtResponse} from "./app/auth/jwtResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>("/login", credentials);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>("/signup", info);
  }
}

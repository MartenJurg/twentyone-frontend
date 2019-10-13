import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignUpInfo} from "./auth/signup_info";
import {LoginInfo} from "./auth/login_info";
import {JwtResponse} from "./auth/jwtResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>("/api/auth/login", credentials);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>("/api/auth/signup", info);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8080";  

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(signupRequest: SignupRequest): Observable<any> {  // Added typing for signupRequest
    return this.http.post(`${BASE_URL}/api/auth/register`, signupRequest);
  }

  login (loginReques: any): Observable<any>{
    return this.http.post(BASE_URL+ "/api/auth/login", loginReques);
  }
}

// Define a type for the signup request to improve type safety
export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

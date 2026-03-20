import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { API_URL_UD } from '../../constants/url';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = API_URL_UD + '/api/auth';

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user)
      .pipe(catchError(this.handleError));
  }

  loginUser(username: string, password: string) {
  return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
    username: username,
    password: password
  });
}



  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error.message || error);
  }
}

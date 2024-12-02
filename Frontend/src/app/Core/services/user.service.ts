import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:9090/';

  constructor(private http: HttpClient) {}

  // Register a new user
  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      map((response: any) => {
        // Handle successful response
        console.log('Registration Response:', response);
        return response; // You can modify the response here if needed
      }),
      catchError((error) => {
        // Handle errors
        console.error('Registration Error:', error);
        return throwError(() => error); // Re-throw the error to the component
      })
    );
  }

  // Login a user
  login(credentials: Partial<User>): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      map((response: any) => {
        // Handle successful response
        console.log('Login Response:', response);
        return response; // You can modify the response here if needed
      }),
      catchError((error) => {
        // Handle errors
        console.error('Login Error:', error);
        return throwError(() => error); // Re-throw the error to the component
      })
    );
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt'); // Check if JWT token exists in localStorage
  }
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}logout`, {}); // POST request to /logout
  }
}

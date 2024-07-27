import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { ApiService } from '../api-service/api.service';
import { LoginResponse } from '../api-service/models/responses/LoginResponse';
import { ApiResponse } from '../api-service/models/responses/base-responses/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  
  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(currentUser ? JSON.parse(currentUser) : undefined);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.apiService.login(email, password).subscribe(
        (response: ApiResponse<LoginResponse>) => {
          if (response.data && response.data.jwtToken) {
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            this.currentUserSubject.next(response.data);
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        },
        error => {
          console.error("Error: ", error);
          observer.error(false);
        }
      );
    });
  }
  

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}

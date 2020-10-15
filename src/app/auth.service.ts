import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from './user';




@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  private user$ = new Subject<User>();
  private apiUrl = '/api/auth/';
  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    const loginCredential = {email, password};
    console.log('login credentials', loginCredential)
    return of(loginCredential)
  }

  logout() {
    //remove user form subject
    this.setuser(null);
    console.log('user did logout successfully');
  }

  get user() {
    return this.user$.asObservable();
  }

  register(user: any) {
    // //make an api call to save user in db
    // //update the user subject
    // this.setuser(user);
    // console.log(`registered user successfully`, user);
    // return of(user);


    return this.httpClient.post<User>(`${this.apiUrl}register`, user).pipe
    (
      switchMap(savedUser => {
        this.setuser(savedUser);
        console.log(`user registerd successfully`, savedUser);
        return of(savedUser);
      }),
      catchError(e => {
        console.log(`Server error occured`, e)
        return throwError(`Registeration failed please contact admin`);
      })
    );
  }

  private setuser(user){
    this.user$.next(user);
  }
}

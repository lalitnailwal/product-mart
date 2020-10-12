import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { User } from './user';




@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  private user$ = new Subject<User>();

  constructor() { }

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
    //make an api call to save user in db
    //update the user subject
    this.setuser(user);
    console.log(`registered user successfully`, user);
    return of(user);
  }

  private setuser(user){
    this.user$.next(user);
  }
}

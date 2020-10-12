import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  constructor() { }

  login(email: string, password: string) {
    const loginCredential = {email, password};
    console.log('login credentials', loginCredential)
    return of(loginCredential)
  }
}

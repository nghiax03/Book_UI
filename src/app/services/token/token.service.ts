import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
    }
  }

  get token(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    } catch (error) {
      return false;
    }
  }
  isTokenNotValid() {
    return !this.isTokenValid();
  }

  private isTokenValid(){
    const token = this.token;
    if(!token) {
       return false;
    }
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if(isTokenExpired){
      localStorage.clear();
      return false;
    }
    return true;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor() {
    this.checkAuth();
  }
  private checkAuth():void{
    const userId = localStorage.getItem('Id');
    this.isAuthenticated =! !userId;
  }
  public isAuth():boolean{
    return this.isAuthenticated;
  }
}


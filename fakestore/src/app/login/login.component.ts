import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  showInvalid: boolean = false;
  users: { username: string, password: string, id: string }[] = [];
  ngOnInit() {
    this.getUsers()
  }

  getUsers():void{
    this.http.get<any[]>('https://fakestoreapi.com/users')
      .subscribe((response) => {
        this.users = response.map((user) => ({
          username: user.username,
          password: user.password,
          id: user.id.toString()
        }));
      });
  }

  constructor(private http: HttpClient, private router: Router) {}
  login() {
    this.http.post('https://fakestoreapi.com/auth/login', {
      username: this.email,
      password: this.password
    }).subscribe((response: any) => {
      const token = response.token;
      const matchedUser = this.users.find(user => user.username === this.email && user.password === this.password);
      if (matchedUser && token) {
        localStorage.setItem('Id', matchedUser.id);
        localStorage.setItem('token', token);
        this.email = '';
        this.password = '';
        this.router.navigate(['/user']).then(() => {
          window.location.reload();
        });
      }
      else {
        this.showInvalid = true;
      }
    });
  }
}

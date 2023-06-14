import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name!: { firstname: string, lastname: string };
  username!: string;
  phone!: string;
  email!: string;
  address!: { city: string, street: string, number: number, zipcode: string };
  carts: any[] = [];
  products: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const userId = localStorage.getItem('Id');
    if (userId) {
      const userUrl = `https://fakestoreapi.com/users/${userId}`;
      this.http.get<any>(userUrl).subscribe(data => {
        this.name = data.name;
        this.username = data.username;
        this.phone = data.phone;
        this.email = data.email;
        this.address = data.address;
      });

      const cartUrl = `https://fakestoreapi.com/carts/user/${userId}`;
      this.http.get<any[]>(cartUrl).subscribe(carts => {
        this.carts = carts;
        this.getCartProducts();
      });
    }
  }

  getCartProducts(): void {
    const productIds = this.carts.map(cart => cart.products.map((product: { productId: string }) => product.productId)).flat();
    const uniqueProductIds = [...new Set(productIds)];

    const productRequests = uniqueProductIds.map(productId =>
      this.http.get<any>(`https://fakestoreapi.com/products/${productId}`)
    );

    forkJoin(productRequests).subscribe(products => {
      this.products = products;
    });
  }

  clickOnLogout(): void {
    localStorage.removeItem('Id');
    localStorage.removeItem('token');
  }
}

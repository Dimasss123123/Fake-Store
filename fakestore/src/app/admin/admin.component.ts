import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  updateUserData: any = {};
  updateCartData: any = {};
  addUserData: any = {};
  carts: any[] =[];
  addCartData = {
    userId: '',
    date: '',
    products: [{ productId: '', quantity: '' }]
  };
  TodayDate: Date = new Date();

  selectedProductCount = 1;
  availableProductCounts = Array.from({ length: 30 }, (_, i) => i + 1);
  constructor(private http: HttpClient, private elementRef: ElementRef) {
    this.TodayDate = new Date();
  }

  ngOnInit() {
    this.getUsers();
    this.getCarts();
  }

  getUsers() {
    this.http.get<any[]>('https://fakestoreapi.com/users')
      .subscribe(
        (data) => {
          this.users = data;
        }
      );
  }
  getCarts() {
    this.http.get<any[]>('https://fakestoreapi.com/carts')
      .subscribe(
        (data) => {
          this.carts = data;
        }
      );
  }

  deleteUser(userId: number) {
    this.http.delete(`https://fakestoreapi.com/users/${userId}`)
      .subscribe(
        () => {
          this.users = this.users.filter(user => user.id !== userId);
        }
      );
  }

  updateUser() {
    const userId = this.updateUserData.id;
    this.http.put(`https://fakestoreapi.com/users/${userId}`, {
      email: this.updateUserData.email,
      username: this.updateUserData.username,
      name: {
        firstname: this.updateUserData.firstname,
        lastname: this.updateUserData.lastname
      },
      phone: this.updateUserData.phone,
      address:{
        city: this.updateUserData.city,
        street: this.updateUserData.street,
        number: this.updateUserData.number,
        zipcode: this.updateUserData.zipcode
      }
    })
      .subscribe(
        (response) => {
          this.users = this.users.map(user => {
            if (user.id === userId) {
              return response;
            }
            return user;
          });
          console.log('User updated successfully');
        },
        (error) => {
          console.log('Error occurred while updating user:', error);
        }
      );
  }

  addUser() {
    this.http.post('https://fakestoreapi.com/users', {
      email: this.addUserData.email,
      username: this.addUserData.username,
      name: {
        firstname: this.addUserData.firstname,
        lastname: this.addUserData.lastname
      },
      password: this.addUserData.password,
      phone: this.addUserData.phone,
      address:{
        city: this.addUserData.city,
        street: this.addUserData.street,
        number: this.addUserData.number,
        zipcode: this.addUserData.zipcode
      }
    })
      .subscribe(
        (response) => {
          this.users.push(response);
          console.log('User added successfully');
        }
      );
  }

  clickOnEdit(user: any) {
    this.updateUserData.id = user.id;
    this.updateUserData.email = user.email;
    this.updateUserData.username = user.username;
    this.updateUserData.firstname = user.name.firstname;
    this.updateUserData.lastname = user.name.lastname;
    this.updateUserData.phone = user.phone;
    this.updateUserData.city = user.address.city;
    this.updateUserData.street = user.address.street;
    this.updateUserData.number = user.address.number;
    this.updateUserData.zipcode = user.address.zipcode;
  }
  scrollToCartBlock() {
    const cartBlockElement = this.elementRef.nativeElement.querySelector('.cart-block');
    if (cartBlockElement) {
      cartBlockElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  scrollToUserBlock() {
    const cartBlockElement = this.elementRef.nativeElement.querySelector('.user-block');
    if (cartBlockElement) {
      cartBlockElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  deleteCart(cartId: number) {
    this.http.delete(`https://fakestoreapi.com/carts/${cartId}`)
      .subscribe(
        () => {
          this.carts = this.carts.filter(cart => cart.id !== cartId);
        }
      );
  }
  updateCart() {
    const cartId = this.updateCartData.id;
    this.http.put(`https://fakestoreapi.com/carts/${cartId}`, {
      userId: this.updateCartData.userId,
      date: this.updateCartData.date,
      products: this.updateCartData.products
    })
      .subscribe(
        (response) => {

          this.carts = this.carts.map(cart => {
            if (cart.id === cartId) {
              return response;
            }
            return cart;
          });
          console.log('Cart updated successfully');
        },
        (error) => {
          console.log('Error occurred while updating cart:', error);
        }
      );
  }
  addCart() {
    const cartData = {
      userId: this.addCartData.userId,
      date: this.addCartData.date,
      products: [] as { productId: any; quantity: any; }[]
    };

    for (const product of this.addCartData.products as { productId: any; quantity: any; }[]) {
      cartData.products.push({
        productId: product.productId,
        quantity: product.quantity
      });
    }

    this.http.post<any>('https://fakestoreapi.com/carts', cartData)
      .subscribe(
        (response) => {
          this.carts.push(response);
          console.log('Cart added successfully');
        },
        (error) => {
          console.log('Error occurred while adding cart:', error);
        }
      );
  }


  clickOnEditCart(cart: any) {
    this.updateCartData.id = cart.id;
    this.updateCartData.userId = cart.userId;
    this.updateCartData.date = cart.date;
    this.updateCartData.products = [...cart.products];
  }
  onProductCountChange() {
    const productCount = parseInt(String(this.selectedProductCount), 10);
    this.addCartData.products = Array.from({ length: productCount }, () => ({
      productId: '',
      quantity: ''
    }));
  }
}

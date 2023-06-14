import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from "../auth.service";
import {CartService} from "../cart.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, public CartService: CartService, private modalService: NgbModal) {
    this.authenticated = authService.isAuth();
  }

  lastScrollPosition = 0;
  navbar: HTMLElement | null = null;
  isDarkTheme: boolean = false;
  authenticated: boolean;

  ngOnInit(): void {
    this.navbar = document.querySelector('.navbar');
    document.body.classList.add('dark-theme');
    this.isDarkTheme = true;
  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navbarHeight = this.navbar?.offsetHeight || 0;
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPosition < this.lastScrollPosition) {
      this.navbar?.classList.remove('navbar--hidden');
    } else {
      if (currentScrollPosition > navbarHeight) {
        this.navbar?.classList.add('navbar--hidden');
      }
    }
    this.lastScrollPosition = currentScrollPosition;
  }
  checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  openCart(cartModal: any) {
    this.modalService.open(cartModal, { ariaLabelledBy: 'modal-title' });
  }

  }

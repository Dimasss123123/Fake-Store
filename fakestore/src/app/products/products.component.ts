import { Component, OnInit } from '@angular/core';
import { FakeStoreService } from '../fake-store.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { AuthService} from "../auth.service";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  selectedProduct: any;
  products$: Observable<any[]>;
  filteredProducts$: Observable<any[]>;
  authenticated: boolean;


  constructor(private fakeStoreService: FakeStoreService, private cartService: CartService, private modalService: NgbModal, private authService: AuthService) {
    this.products$ = new Observable<any[]>();
    this.filteredProducts$ = new Observable<any[]>();
    this.authenticated = authService.isAuth();
  }

  ngOnInit() {
    this.products$ = this.fakeStoreService.getProducts();
    this.filteredProducts$ = this.products$;
  }

  openModal(productModal: any, product: any) {
    this.selectedProduct = { ...product, quantity: 1 };
    this.modalService.open(productModal, { ariaLabelledBy: 'modal-title' });
  }


  filterProducts(category: string) {
    this.filteredProducts$ = this.getFilteredProducts(category);
  }

  getFilteredProducts(category: string): Observable<any[]> {
    return this.products$.pipe(
      map(products => products.filter(product => product.category === category))
    );
  }
  showAllProducts() {
    this.filteredProducts$ = this.products$;
  }
  sortDesc() {
    this.filteredProducts$ = this.fakeStoreService.getProducts('desc');
  }
  sortAsc(){
    this.filteredProducts$ = this.fakeStoreService.getProducts('asc');
  }
  addToCart(product: any, quantity: number) {
    this.cartService.addToCart(product, quantity);
  }
  closeModal() {
    this.modalService.dismissAll();
  }
}

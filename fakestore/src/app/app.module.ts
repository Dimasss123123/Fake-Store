import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import {HttpClientModule} from "@angular/common/http";

import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import {AuthService} from "./auth.service";






@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    LoginComponent,
    UserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    NgbModule,
    NgbModalModule,
    FormsModule,



  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

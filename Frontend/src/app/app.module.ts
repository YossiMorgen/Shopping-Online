import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsLayoutComponent } from './components/products-area/products-layout/products-layout.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { CategoriesComponent } from './components/products-area/categories/categories.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProductsLayoutComponent,
    AuthMenuComponent,
    CategoriesComponent,
    ProductListComponent,
    ProductCardComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {useClass: JwtInterceptor, provide: HTTP_INTERCEPTORS, multi: true}
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

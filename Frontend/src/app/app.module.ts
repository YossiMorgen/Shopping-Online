import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
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
import { EditProductComponent } from './components/products-area/edit-product/edit-product.component';
import { CartLayoutComponent } from './components/cart-area/cart-layout/cart-layout.component';
import { CartProductsComponent } from './components/cart-area/cart-products/cart-products.component';
import { CartHeaderComponent } from './components/cart-area/cart-header/cart-header.component';
import { HttpResponseInterceptor } from './utils/auth.interceptor';
import { CartProductCardComponent } from './components/cart-area/cart-product-card/cart-product-card.component';
import { CartFooterComponent } from './components/cart-area/cart-footer/cart-footer.component';
import { SearchProductsComponent } from './components/products-area/search-products/search-products.component';
import { MyCartComponent } from './components/order-area/my-cart/my-cart.component';
import { OrderLayoutComponent } from './components/order-area/order-layout/order-layout.component';
import { OrderFormComponent } from './components/order-area/order-form/order-form.component';
import { ReceiptComponent } from './components/order-area/receipt/receipt.component';
import { DownloadPdfComponent } from './components/order-area/download-pdf/download-pdf.component';
import { PopupAddProductComponent } from './components/products-area/popup-add-product/popup-add-product.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProductsLayoutComponent,
    AuthMenuComponent,
    CategoriesComponent,
    ProductListComponent,
    ProductCardComponent,
    AddProductComponent,
    EditProductComponent,
    CartLayoutComponent,
    CartProductsComponent,
    CartHeaderComponent,
    CartProductCardComponent,
    CartFooterComponent,
    SearchProductsComponent,
    MyCartComponent,
    OrderLayoutComponent,
    OrderFormComponent,
    ReceiptComponent,
    DownloadPdfComponent,
    PopupAddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [
    {useClass: JwtInterceptor, provide: HTTP_INTERCEPTORS, multi: true},
    {useClass: HttpResponseInterceptor, provide: HTTP_INTERCEPTORS, multi: true}
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

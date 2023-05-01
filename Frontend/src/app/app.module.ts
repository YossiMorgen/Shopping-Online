import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkListboxModule} from '@angular/cdk/listbox';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkMenuModule} from '@angular/cdk/menu';
import {DialogModule} from '@angular/cdk/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/playground/page-not-found/page-not-found.component';

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
    ReactiveFormsModule,
    AngularToastifyModule,
    
    MatFormFieldModule,
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkListboxModule,
    CdkMenuModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    DialogModule,
  ],
  providers: [
    ToastService,
    {useClass: JwtInterceptor, provide: HTTP_INTERCEPTORS, multi: true},
    {useClass: HttpResponseInterceptor, provide: HTTP_INTERCEPTORS, multi: true}
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

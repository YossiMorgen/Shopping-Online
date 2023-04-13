import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { AuthGuard } from './utils/auth.guard';
import { ProductsLayoutComponent } from './components/products-area/products-layout/products-layout.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { EditProductComponent } from './components/products-area/edit-product/edit-product.component';
import { AdminGuard } from './utils/admin.guard';
import { RegisteredGuard } from './utils/registered.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [RegisteredGuard] },
    {path: 'register', component: RegisterComponent, canActivate: [RegisteredGuard] },
    {path: 'products', component: ProductsLayoutComponent, canActivate: [AuthGuard] },
    {path: 'products/add', component: AddProductComponent, canActivate: [AdminGuard] },
    {path: 'products/:product_id', component: EditProductComponent, canActivate: [AdminGuard] },
    {path: '', redirectTo: '/products', pathMatch: "full" },
    {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }

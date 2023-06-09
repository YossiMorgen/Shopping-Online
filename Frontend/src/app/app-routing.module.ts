import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { AuthGuard } from './utils/auth.guard';
import { ProductsLayoutComponent } from './components/products-area/products-layout/products-layout.component';
import { RegisteredGuard } from './utils/registered.guard';
import { OrderLayoutComponent } from './components/order-area/order-layout/order-layout.component';
import { PageNotFoundComponent } from './components/playground/page-not-found/page-not-found.component';
import { ReceiptComponent } from './components/order-area/receipt/receipt.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [RegisteredGuard] },
    {path: 'register', component: RegisterComponent, canActivate: [RegisteredGuard] },
    {path: 'products', component: ProductsLayoutComponent},
    {path: 'order', component: OrderLayoutComponent, canActivate: [AuthGuard] },
    {path: 'receipt', component: ReceiptComponent, canActivate: [AuthGuard] },
    {path: '', redirectTo: '/products', pathMatch: "full" },
    {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }

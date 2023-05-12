import { CartService } from 'src/app/services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ConfigService } from 'src/app/utils/config.service';
import ProductCartModel from 'src/app/models/product-models/product-cart.model';
import { PopupAddProductComponent } from '../popup-add-product/popup-add-product.component';
import {MatDialog} from '@angular/material/dialog';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  animations: [
    trigger('productsState', [
      state('in', style({
        'z-index' : -6,
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            'z-index' : -6,
            opacity: 0,
            transform: 'translateY(-200px)',
            offset: 0,
          }),
          style({
            offset: 0.3,
            opacity: 0.7,
            transform: 'translateY(-120px)',
          }),
          style({
            offset: 0.5,
            opacity: 0.8,
            transform: 'translateY(90px)',
          }),
          style({
            offset: 0.8,
            opacity: 0.9,
            transform: 'translateY(-40px)',
          })
        ])),

      ]),
      transition('* => void', [
        animate(300, style({
          opacity: 0.1,
          transform: 'translateY(200px)'
        }))
      ])
    ]),
  ]
})
export class ProductCardComponent {

  
  public constructor( 
    public productsService: ProductsService,
    public auth : AuthService,
    public cartService : CartService,
    public dialog: MatDialog,
    private toast: ToastifyNotificationsService
  ){}
  
  @Input()
  public product: ProductModel;

  @Input()
  public i: number;

  public async deleteProduct(){
    try {
        
      if(!window.confirm('Are You Sure?')) return;
      await this.productsService.deleteProduct( this.product.productID )
      this.toast.message('Deleted!!!');
    } catch (error:any) {
      this.toast.error(error);
    }
  }
  
  public showDialog(){
    const dialogRef = this.dialog.open(PopupAddProductComponent, {
      width: '45vh',
      enterAnimationDuration: '300',
      exitAnimationDuration: '200',
      data: {...this.product}
    });
    dialogRef.afterClosed().subscribe(async (result: number) => {
      if(result){          
        await this.addProductToCart(result);
      }
    });
  }

  public async addProductToCart(amount: number) {
    try {
      const productCart = new ProductCartModel()
      productCart.cartID = this.cartService.cart?.cartID;
      productCart.productID = this.product.productID;
      productCart.amount = amount;
      
      this.cartService.changeProductAmount(productCart);

    } catch (error : any) {
      this.toast.error(error);
    }
  }
}

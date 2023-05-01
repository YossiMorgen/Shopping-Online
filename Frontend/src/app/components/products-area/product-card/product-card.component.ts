import { CartService } from 'src/app/services/cart.service';
import { Component, Input } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ConfigService } from 'src/app/utils/config.service';
import ProductCartModel from 'src/app/models/product-models/product-cart.model';
import { PopupAddProductComponent } from '../popup-add-product/popup-add-product.component';
import {MatDialog} from '@angular/material/dialog';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
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

  public showEdit() {
    if(this.auth.isAdmin()){
      this.productsService.i = 0
      this.productsService.i = this.i;  
      return;
    }

    if(!this.auth.isAdmin()){
      const dialogRef = this.dialog.open(PopupAddProductComponent, {
        width: '250px',
        data: {...this.product}
      });
      dialogRef.afterClosed().subscribe(async (result: number) => {
        if(result){          
          await this.addProductToCart(result);
        }
      });
    }
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

import { CartService } from 'src/app/services/cart.service';
import { Component, Input } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { ConfigService } from 'src/app/utils/config.service';
import ProductCartModel from 'src/app/models/product-models/product-cart.model';
import { PopupAddProductComponent } from '../popup-add-product/popup-add-product.component';
import {MatDialog} from '@angular/material/dialog';

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
    public dialog: MatDialog
  ){}
  
  @Input()
  public product: ProductModel;

  @Input()
  public i: number;

  public async deleteProduct(){
    try {
        
        if(!window.confirm('Are You Sure?')) return;
        await this.productsService.deleteProduct( this.product.productID )
        alert('Deleted!!!');

    } catch (error:any) {
        alert(error.message)
    }
  }

  public async addProductToCart() {
    try {
      const productCart = new ProductCartModel()
      productCart.cartID = this.cartService.cart?.cartID;
      productCart.productID = this.product.productID;
      productCart.amount = 1;
            
      this.cartService.addProduct(productCart);

    } catch (error : any) {
      alert(error.message);
    }
  }

  public showEdit() {
    this.productsService.i = this.i;  
    console.log(this.productsService.i);

    if(!this.auth.isAdmin()){const dialogRef = this.dialog.open(PopupAddProductComponent, {
      width: '250px',
      data: {product: this.product, i: this.i}
    });}
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(PopupAddProductComponent, {
      width: '250px',
      data: {product: this.product, i: this.i}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }


}

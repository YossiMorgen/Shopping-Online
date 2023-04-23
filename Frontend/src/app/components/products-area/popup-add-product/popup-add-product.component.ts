import { Component, Input, OnInit } from '@angular/core';
import ProductCartModel from 'src/app/models/product-models/product-cart.model';
import ProductModel from 'src/app/models/product-models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-popup-add-product',
  templateUrl: './popup-add-product.component.html',
  styleUrls: ['./popup-add-product.component.css']
})
export class PopupAddProductComponent implements OnInit {

  public amount: number = 1;
  
  public constructor( 
    private productsService: ProductsService,
    public cartService : CartService,
    public dialogRef: MatDialogRef<PopupAddProductComponent>,
  ){}
  
  @Input()
  public product: ProductModel;

  @Input()
  public i: number;

  ngOnInit(){}

  public async addProductToCart() {
    try {
      const productCart = new ProductCartModel()
      productCart.cartID = this.cartService.cart?.cartID;
      productCart.productID = this.product.productID;
      productCart.amount = this.amount;
            
      this.cartService.addProduct(productCart);

    } catch (error : any) {
      alert(error.message);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

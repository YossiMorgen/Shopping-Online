import { Component, Inject, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-popup-add-product',
  templateUrl: './popup-add-product.component.html',
  styleUrls: ['./popup-add-product.component.css']
})
export class PopupAddProductComponent implements OnInit {

  public amount : number = 1;
  
  public constructor( 
    public cartService : CartService,
    public dialogRef: MatDialogRef<PopupAddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public product: ProductModel,
    public auth: AuthService
  ){}

  ngOnInit(): void {
    this.amount = this.cartService.products.find(product => product.productName === this.product.productName)?.amount || 1;
  }

  onNoClick(): void {    
    this.dialogRef.close();
  }

}

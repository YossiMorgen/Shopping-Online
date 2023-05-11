import { Component, Inject, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';
import { Router } from '@angular/router';

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
    public auth: AuthService,
    private toast: ToastifyNotificationsService,
    public router : Router  
  ){}


  ngOnInit(): void {
    !this.auth.user && this.toast.message('You gotta login first')
    this.amount = this.cartService.products.find(product => product.productName === this.product.productName)?.amount || 1;

    this.router.events.subscribe(event => {
      if(this.router.url.search('products') !== -1){
        this.dialogRef.close();
      }
    })
  }

  onNoClick(): void {    
    this.dialogRef.close();
  }

}

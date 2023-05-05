import { ProductsService } from 'src/app/services/products.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public paramID : number;
  public categoryID : number; 
  
  public editProductForm = this.formBuilder.group({
    productName : ['', [ Validators.minLength(2)]],
    categoryID : [1],
    price : [1, [ Validators.min(1)]]
  })

  public file: File;

  constructor ( 
    public productsService: ProductsService, 
    public auth: AuthService,
    private formBuilder : FormBuilder,
    private toast: ToastifyNotificationsService
  ) {}

  ngOnInit(): void {    
    const i = this.productsService.i;
    this.editProductForm.setValue({
      productName: this.productsService.products[i].productName,
      categoryID: this.productsService.products[i].categoryID,
      price: this.productsService.products[i].price
    })
  }

  public onFileSelected(event: any){
    this.file = event.target.files[0];
  }

  public async editProduct(){
    const i = this.productsService.i;

  //   try {
  //     console.log(this.productsService.products[i]);
      
  //     const product = new ProductModel(this.editProductForm.value)
  //     const formData = product.getFormData();
  //     formData.append('productID', this.productsService.products[i].productID.toString() );

  //     if(this.file){
  //       formData.append('image', this.file);
  //     }

  //     await this.productsService.updateProduct(formData, this.productsService.products[i].productID);
  //     this.toast.success('Product Edited Successfully')
  //   } catch (error : any) {
  //     this.toast.error(error);
  //   }
  }

  
  public hideEdit ( ) {
    this.productsService.i = -1
  }
}

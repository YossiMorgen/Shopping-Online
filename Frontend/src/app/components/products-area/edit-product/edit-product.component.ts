import { ProductsService } from 'src/app/services/products.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

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
    price : [1, [ Validators.min(1)] || 1]
  })

  public file: File;
  @ViewChild('productImage')
  public productImage: ElementRef<HTMLInputElement>

  constructor ( 
    public productsService: ProductsService, 
    public auth: AuthService,
    private formBuilder : FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.productsService.products[this.productsService.i]);
    
    this.editProductForm.setValue({
      productName: this.productsService.products[this.productsService.i].productName,
      categoryID: this.productsService.products[this.productsService.i].categoryID,
      price: this.productsService.products[this.productsService.i].price
    })
    // this.editProductForm.controls['productName'].setValue(this.productsService.products[this.productsService.i].productName)
    // this.editProductForm.controls['categoryID'].setValue(this.productsService.products[this.productsService.i].categoryID)
    // this.editProductForm.controls['price'].setValue(this.productsService.products[this.productsService.i].price)
  }

  public onFileSelected(event: any){
    this.file = event.target.files[0];
  }

  public async editProduct(){
    try {
      console.log(this.productsService.products[this.productsService.i]);
      
      const product = new ProductModel(this.editProductForm.value)
      const formData = product.getFormData();
      formData.append('productID', this.productsService.products[this.productsService.i].productID.toString() );

      if(this.file){
        formData.append('image', this.file);
      }

      await this.productsService.updateProduct(formData, this.productsService.products[this.productsService.i].productID);
      alert('Product Edited Successfully');

    } catch (error : any) {
      alert(error.message);
    }
  }

  
  public hideEdit ( ) {
    this.productsService.i = -1
  }
}

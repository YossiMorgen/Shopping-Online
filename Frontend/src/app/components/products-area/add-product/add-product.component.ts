import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ProductModel from 'src/app/models/product-models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public addProductForm = this.formBuilder.group({
    productName : ['', [Validators.required, Validators.minLength(2)]],
    categoryID : [0, [Validators.required]],
    price : [1, [Validators.required, Validators.min(1)]]
  })

  constructor ( 
    public productsService: ProductsService, 
    private router: Router ,
    private formBuilder : FormBuilder,
    private toast: ToastifyNotificationsService
  ) {}

  public file: File;
  
  async ngOnInit(): Promise<void> {
    try {
      await this.productsService.getCategories();
      console.log(this.productsService.categories);
    } catch (error : any) {
      this.toast.error(error);
    }
  }

  public onFileSelected(event: any){
    this.file = event.target.files[0];
  }

  public async addProduct(){
    try {      
      const formData = new FormData();
      formData.append('image', this.file)
      formData.append('productName', this.addProductForm.value.productName)
      formData.append('categoryID', this.addProductForm.value.categoryID.toString())
      formData.append('price', this.addProductForm.value.price.toString())
      await this.productsService.addProduct(formData);
      alert('Product Added Successfully');
      this.router.navigateByUrl('/products');

    } catch (error : any) {
      this.toast.error(error);
    }
  }
}

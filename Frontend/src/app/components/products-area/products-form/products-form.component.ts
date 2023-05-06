import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import ProductModel from 'src/app/models/product-models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  editMode = false;
  editedItemIndex: number;

  public subscription : Subscription

  public productsForm = this.formBuilder.group({
    productName : ['', [Validators.required, Validators.minLength(2)]],
    categoryID : [0, [Validators.required]],
    price : [1, [Validators.required, Validators.min(1)]]
  })

  public file: File;

  constructor ( 
    public productsService: ProductsService, 
    private router: Router ,
    private formBuilder : FormBuilder,
    private toast: ToastifyNotificationsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.subscription = this.productsService.startedEditing
      .subscribe((index : number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.productsForm.setValue({
          productName: this.productsService.products[this.editedItemIndex].productName,
          categoryID: this.productsService.products[this.editedItemIndex].categoryID,
          price: this.productsService.products[this.editedItemIndex].price
        })
      })
    try {
      await this.productsService.getCategories();
      console.log(this.editedItemIndex);
      
    } catch (error : any) {
      this.toast.error(error);
    }
  }

  addMode() {
    this.productsForm.reset();
    this.editMode = false;
  }


  public onFileSelected(event: any){
    this.file = event.target.files[0];
  }

  public async submitProduct(){

    try {      
      const formData = new FormData();

      formData.append('productName', this.productsForm.value.productName)
      formData.append('categoryID', this.productsForm.value.categoryID.toString())
      formData.append('price', this.productsForm.value.price.toString())
      
      if(this.file){
        formData.append('image', this.file);
      }

      if(this.editMode){        
        formData.append('productID', this.productsService.products[this.editedItemIndex].productID.toString() );
        await this.productsService.updateProduct(formData, this.productsService.products[this.editedItemIndex].productID);
        this.toast.success('Product Edited Successfully')
        this.editMode = false;
        this.productsForm.reset();
        return;
      }

      await this.productsService.addProduct(formData);
      this.toast.success('Product Added Successfully');
      this.productsForm.reset();

    } catch (error : any) {
      this.toast.error(error);
    }
  }

}

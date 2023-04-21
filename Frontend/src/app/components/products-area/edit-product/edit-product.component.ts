import { ProductsService } from 'src/app/services/products.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  public paramID : number;
  public categoryID : number; 

  @ViewChild('productImage')
  public productImage: ElementRef<HTMLInputElement>

  constructor ( 
    public productsService: ProductsService, 
    private router: Router, 
    private activatedRoute :ActivatedRoute,
    public auth: AuthService
  ) {}

  public async editProduct(){
    try {
      console.log(this.productsService.products[this.productsService.i]);
      
      const product = new ProductModel(this.productsService.products[this.productsService.i])
      const formData = product.getFormData();
      formData.append('productID', this.productsService.products[this.productsService.i].productID.toString() );

      if(this.productImage.nativeElement.files){
        formData.append('image', this.productImage.nativeElement.files[0]);
      }

      await this.productsService.updateProduct(formData, this.productsService.products[this.productsService.i].productID);
      alert('Product Edited Successfully');
      this.router.navigateByUrl('/products');

    } catch (error : any) {
      alert(error.message);
    }
  }

  
  public hideEdit ( ) {
    this.productsService.i = -1
  }
}

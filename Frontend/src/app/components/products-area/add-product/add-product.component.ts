import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import ProductModel from 'src/app/models/product-models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public product : ProductModel = new ProductModel();

  constructor ( public productsService: ProductsService, private router: Router ) {}

  
  @ViewChild('productImage')
  public productImage: ElementRef<HTMLInputElement>

  async ngOnInit(): Promise<void> {
    try {
      await this.productsService.getCategories();
      console.log(this.productsService.categories);
    } catch (error : any) {
      alert(error.message);
    }
  }

  public async addProduct(){
    try {
      this.product.image = this.productImage.nativeElement.files[0];
      if(!this.product.image) {
        alert('Product Image Is Necessary ')
        return;
      }
      await this.productsService.addProduct(this.product);
      alert('Product Added Successfully');
      this.router.navigateByUrl('/products');

    } catch (error : any) {
      alert(error.message);
    }
  }
}

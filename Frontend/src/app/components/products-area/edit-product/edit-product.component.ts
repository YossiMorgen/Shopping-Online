import { ProductsService } from 'src/app/services/products.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  public product : ProductModel = new ProductModel();
  public paramID : number;
  public categoryID : number; 
  @ViewChild('productImage')
  public productImage: ElementRef<HTMLInputElement>

  constructor ( 
    public productsService: ProductsService, 
    private router: Router, 
    private activatedRoute :ActivatedRoute
  ) {}


  async ngOnInit(): Promise<void> {

    // get id from params
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      
      this.paramID = +params['product_id'];
    })
    console.log(this.paramID);    
    
    // get categories and product details 
    try {
      await this.productsService.getCategories();
      const product = await this.productsService.getOneProduct(this.paramID);
      this.product = product;
    } catch (error : any) {
      alert(error.message);
    }
  }

  public async editProduct(){
    try {
      console.log( this.product );

      if(this.productImage.nativeElement.files[0]){
        this.product.image = this.productImage.nativeElement.files[0];
        console.log("changed product image");
      }
      console.log( this.product );

      await this.productsService.updateProduct(this.product);
      alert('Product Edited Successfully');
      this.router.navigateByUrl('/products');

    } catch (error : any) {
      alert(error.message);
    }
  }
}

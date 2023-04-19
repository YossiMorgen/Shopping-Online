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

  public visibility: boolean = false;
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

    if(!this.paramID) {
       return;
    }
    console.log(this.paramID);
    
    this.visibility = true;
    this.product = this.productsService.products.find(product => product.productID === this.paramID)
    console.log(this.product);

    if(!this.product) {
      this.visibility = false;
      return;
    }
    
    // get categories and product details 
    // try {
    //   await this.productsService.getCategories();
    //   const product = await this.productsService.getOneProduct(this.paramID);
    //   this.product = product;
    // } catch (error : any) {
    //   alert(error.message);
    // }
  }

  public async editProduct(){
    try {
      console.log( this.productImage.nativeElement.files );
    
      const formData = new FormData();
      formData.append('productName', this.product.productName );
      formData.append('imageName', this.product.imageName );
      formData.append('price', this.product.price.toString() );
      formData.append('categoryID', this.product.categoryID.toString() );
      formData.append('productID', this.product.productID.toString() );

      if(this.productImage.nativeElement.files){
        formData.append('image', this.productImage.nativeElement.files[0]);
      }

      await this.productsService.updateProduct(formData, this.product.productID);
      alert('Product Edited Successfully');
      this.router.navigateByUrl('/products');

    } catch (error : any) {
      alert(error.message);
    }
  }
}

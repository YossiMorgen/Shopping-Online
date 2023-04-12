import { Component, Input } from '@angular/core';
import ProductModel from 'src/app/models/product-models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ConfigService } from 'src/app/utils/config.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  
  public constructor( 
    private productsService: ProductsService,
    private config: ConfigService
  ){}
  
  @Input()
  public product: ProductModel;

  public async deleteProduct(){
    try {
        
        if(!window.confirm('Are You Sure?')) return;
        await this.productsService.deleteProduct( this.product.productID )
        alert('Deleted!!!');

    } catch (error:any) {
        alert(error.message)
    }
}
}

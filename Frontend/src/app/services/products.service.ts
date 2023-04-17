import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config.service';
import { firstValueFrom, Observable } from 'rxjs';
import ProductModel from '../models/product-models/product.model';
import CategoryModel from '../models/product-models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public products: ProductModel[] = [];
  public categories: CategoryModel[] = [];
  public constructor( private http:HttpClient, private config: ConfigService) { }

  public async getCategories ( ): Promise<void> {
    
    if(this.categories.length !== 0){
      return new Promise(resolve => resolve())
    }
    
    const observable = this.http.get<CategoryModel[]>(this.config.getAllCategories)
    const categories = await firstValueFrom(observable);
    this.categories = categories;    
  }

  public async getRandomProducts ( ): Promise<void> {
    if(this.products.length != 0 ){
      return new Promise(resolve => resolve())
    }
    const observable = this.http.get<ProductModel[]>(this.config.getRandomProducts)
    const products = await firstValueFrom(observable);
    this.products = products;
  }

  public async getAllProductsByCategory(categoryID: number): Promise<void> {
    const observable = this.http.get<ProductModel[]>(this.config.getProductsByCategory + categoryID)
    const products = await firstValueFrom(observable);
    this.products = products;
  }

  public async getOneProduct(productID: number): Promise<ProductModel>{
    const observable = this.http.get<ProductModel>(this.config.getOneProduct + productID);
    return firstValueFrom(observable);
  }

  public async addProduct(product: ProductModel):Promise<void>{
    
    const formData = new FormData();
    formData.append('productName', product.productName );
    formData.append('price', product.price.toString() );
    formData.append('categoryID', product.categoryID.toString() );
    formData.append('image', product.image );

    const observable = this.http.post<ProductModel>(this.config.addProduct, formData);
    const newProduct = await firstValueFrom(observable);
    this.products.push(newProduct);
  }

  public async updateProduct(product: ProductModel): Promise<void> {
    const Observable = this.http.put<ProductModel>(this.config.updateProduct, product);
    const newProduct = await firstValueFrom(Observable);
    this.products = this.products.map((p: ProductModel) => {
      if(p.productID === product.productID) {
        return newProduct;
      }
      return p;
    })

  }

  public async deleteProduct(id: number):Promise<void>{
  
    const observable = this.http.delete(this.config.deleteProduct + id);
    await firstValueFrom(observable);

    this.products = this.products.filter((product: ProductModel) => product.productID != id )

  }

}

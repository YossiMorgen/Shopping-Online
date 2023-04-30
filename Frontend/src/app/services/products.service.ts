import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config.service';
import { firstValueFrom, Observable } from 'rxjs';
import ProductModel from '../models/product-models/product.model';
import CategoryModel from '../models/product-models/category.model';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public products: ProductModel[] = [];
  public categories: CategoryModel[] = [];
  public isThereProducts: boolean = true;
  public i : number = -1;

  public constructor( 
    private http:HttpClient, 
    private config: ConfigService,
    private route: ActivatedRoute
) { }

  public async getCategories ( ): Promise<void> {
    
    if(this.categories.length !== 0){
      return new Promise(resolve => resolve())
    }
    
    const observable = this.http.get<CategoryModel[]>(this.config.getAllCategories)
    const categories = await firstValueFrom(observable);
    this.categories = categories;    
  }

  public async getProducts() {
    
    this.route.queryParams.subscribe(async (params: any) => {
        
      if(params.search){
        await this.getProductsByName(params.search);
        return ;
      }
      if(params.category_id){
        await this.getAllProductsByCategory(params.category_id);
        return ;
      }
      
      await this.getRandomProducts();
    })
    console.log(this.products);
    
  }

  public async getRandomProducts ( ): Promise<void> {
    const observable = this.http.get<ProductModel[]>(this.config.getRandomProducts)
    const products = await firstValueFrom(observable);
    this.products = this.products.concat(products);
  }

  public async getAllProductsByCategory(categoryID: number): Promise<void> {
    const observable = this.http.get<ProductModel[]>(this.config.getProductsByCategory + categoryID + "?start=" + this.products.length)
    const products = await firstValueFrom(observable);
    this.products = this.products.concat(products);
  }

  public async getProductsByName(name: string): Promise<void> {
    const observable = this.http.get<ProductModel[]>(this.config.searchProducts + name );
    const products = await firstValueFrom(observable);
    this.products = this.products.concat(products);
  }

  public async getOneProduct(productID: number): Promise<ProductModel>{
    const observable = this.http.get<ProductModel>(this.config.getOneProduct + productID);
    return firstValueFrom(observable);
  }

  public async addProduct(product: ProductModel | FormData):Promise<void>{
    // const formData : FormData = product.getFormData();   
    const observable = this.http.post<ProductModel>(this.config.addProduct, product);
    const newProduct = await firstValueFrom(observable);
    this.products.push(newProduct);
  }

  public async updateProduct(product: FormData, productID:number): Promise<void> {
    const Observable = this.http.put<ProductModel>(this.config.updateProduct, product);
    const newProduct = await firstValueFrom(Observable);
    this.products = this.products.map((p: ProductModel) => {
      if(p.productID === productID) {
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

  public async getProductsAndOrdersAmount(): Promise<Array<number>> {
    const observable = this.http.get<Array<number>>(this.config.ordersAndProductsAmount);
    return await firstValueFrom(observable);
  }

}

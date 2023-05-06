import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config.service';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import ProductModel from '../models/product-models/product.model';
import CategoryModel from '../models/product-models/category.model';
import { ActivatedRoute } from '@angular/router';
import { ToastifyNotificationsService } from './toastify-notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  startedEditing = new Subject<number>();

  public products: ProductModel[] = [];
  public categories: CategoryModel[] = [];
  public isThereProducts: boolean = true;
  public i : number = -1;

  public constructor( 
    private http:HttpClient, 
    private config: ConfigService,
    private toast: ToastifyNotificationsService
  ) { }

  public async getCategories ( ): Promise<void> {
    
    if(this.categories.length !== 0){
      return new Promise(resolve => resolve())
    }
    
    const observable = this.http.get<CategoryModel[]>(this.config.getAllCategories)
    const categories = await firstValueFrom(observable);
    this.categories = categories;    
  }

  public async getProducts(params: any) {
    
    let products: ProductModel[] = []
    if(params.search){
      const observable = this.http.get<ProductModel[]>(this.config.searchProducts + params.search + "?start=" + this.products.length );
      products = await firstValueFrom(observable);
    }
    else if(params.category_id){
      const observable = this.http.get<ProductModel[]>(this.config.getProductsByCategory + params.category_id + "?start=" + this.products.length)
      products = await firstValueFrom(observable);
    } else {
      const observable = this.http.get<ProductModel[]>(this.config.getRandomProducts + "?start=" + this.products.length)
      products = await firstValueFrom(observable);
    }
    this.products = this.products.concat(products);

    if(products.length < 24 && this.products.length){
      this.toast.message("We don't have any more products that fit your search")
      this.isThereProducts = false ;
    }
      
  }

  public async getProductsByName(name: string): Promise<void> {
    const observable = this.http.get<ProductModel[]>(this.config.searchProducts + name + "?start=" + this.products.length );
    const products = await firstValueFrom(observable);
    this.products = this.products.concat(products);
  }

  public async addProduct(product: ProductModel | FormData):Promise<void>{
    const observable = this.http.post<ProductModel>(this.config.addProduct, product);
    const newProduct = await firstValueFrom(observable);
    if(!this.isThereProducts){
      this.products.push(newProduct);
    }
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

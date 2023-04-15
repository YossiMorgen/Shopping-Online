import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import ProductCartModel from "../models/product-models/product-cart.model";
import { ConfigService } from "../utils/config.service";
import Cart from '../models/product-models/shopping-cart.model';

@Injectable({
providedIn: 'root'
})
export class CartService {
    public cart: Cart;
    public products: ProductCartModel[] = [];
    public constructor( private http: HttpClient, private config: ConfigService) { }

    public async createCart() {
        const observable = this.http.get<Cart>(this.config.createCart);
        this.cart = await firstValueFrom(observable)
        this.getCartProducts();
    }

    public async getCart(): Promise<void>{
        if(this.cart){
            return new Promise(resolve => resolve())
        }
        
        const observable = this.http.get<Cart>(this.config.getCartDetails)
        this.cart = await firstValueFrom(observable);
        this.getCartProducts();
    }

    public async getCartProducts ( ): Promise<void> {
        const observable = this.http.get<ProductCartModel[]>(this.config.getCartProducts + this.cart.cartID)
        this.products = await firstValueFrom(observable);
    }

    public async addProduct(product: ProductCartModel):Promise<void>{

        const observable = this.http.post(this.config.addCartProduct, product);
        await firstValueFrom(observable);

    }

    public async updateProduct(product: ProductCartModel): Promise<void> {
        const Observable = this.http.put<ProductCartModel>(this.config.updateProduct, product);
        const newProduct = await firstValueFrom(Observable);
        
        this.products = this.products.map((p: ProductCartModel) => {
            if(p.productID === product.productID) {
                return newProduct;
            }

            return p;
        })

    }

    public async deleteProduct(cartProductID: number):Promise<void>{

        const observable = this.http.delete(this.config.deleteProduct + cartProductID);
        await firstValueFrom(observable);

        this.products = this.products.filter((product: ProductCartModel) => product.productID != cartProductID )

    }

}
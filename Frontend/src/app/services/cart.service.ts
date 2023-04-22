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

    public constructor( 
        private http: HttpClient, 
        private config: ConfigService
    ) { }

    public async getCart(): Promise<void>{
        
        if(this.cart){
            return new Promise(resolve => resolve())
        }

        const observable = this.http.get<Cart>(this.config.getCartDetails)
        this.cart = await firstValueFrom(observable);
        this.getCartProductsByCartId();
        
    }

    public async getCartProductsByCartId ( ): Promise<void> {
        const observable = this.http.get<ProductCartModel[]>(this.config.getCartProductsByCartID + this.cart.cartID)
        this.products = await firstValueFrom(observable);
    }

    public async addProduct(product: ProductCartModel):Promise<void>{
        console.log(this.cart);
        
        const i = this.products.findIndex(p => p.productID === product.productID);

        if( i !== -1 ) {
            product.cartProductID = this.products[i].cartProductID;
            product.amount = this.products[i].amount;
            this.products[i] = await this.updateProduct(product, 1);

            return;
        }

        const observable = this.http.post<ProductCartModel>(this.config.addCartProduct, product);
        this.products.push(await firstValueFrom(observable));
    }

    public async reduceQuantity(cartProductID: number):Promise<void>{

        console.log(this.products);
        
        
        const i = this.products.findIndex(p => p.cartProductID === cartProductID);
        

        if( this.products[i].amount === 1) {            
            const observable = this.http.delete(this.config.removeOneCartProduct + cartProductID);
            await firstValueFrom(observable);

            this.products.splice(i, 1);
            
            return;
        }

        this.products[i] = await this.updateProduct(this.products[i], -1);
 
    }    

    public async deleteProduct(cartProductID: number):Promise<void>{

        const observable = this.http.delete(this.config.removeOneCartProduct + cartProductID);
        await firstValueFrom(observable);

        this.products.filter(p => p.cartProductID === cartProductID)

    }    

    public async deleteAllProducts():Promise<void>{

        const observable = this.http.delete(this.config.removeAllCartProducts);
        await firstValueFrom(observable);

        this.products = []

    }   

    public async updateProduct( product: ProductCartModel, num: number): Promise<ProductCartModel> {
        console.log(num);
        console.log(product.amount);
        console.log(product.amount + num);
        
        product.amount += num;
        console.log(product.amount);

        const Observable = this.http.put<ProductCartModel>(this.config.updateOneCartProduct, product);
        const newProduct = await firstValueFrom(Observable);

        return newProduct;
    }

    public productsTotalAmountAndPrice(): Array<number>{
        let sum = 0;
        let count = 0;

        for(const product of this.products){
            sum += product.price;
            count += product.amount;
        }

        return [sum, count];
    }

}
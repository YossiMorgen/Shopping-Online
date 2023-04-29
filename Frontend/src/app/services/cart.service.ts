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

    public totalAmount: number = 0;
    public totalPrice: number = 0;

    public constructor( 
        private http: HttpClient, 
        private config: ConfigService
    ) { }

    public async getCart(): Promise<void>{
        
        if(this.cart && this.cart?.ordered === 0){
            return new Promise(resolve => resolve())
        }

        const observable = this.http.get<Cart>(this.config.getCartDetails)
        this.cart = await firstValueFrom(observable);
        this.getCartProductsByCartId();
        
    }

    public async getCartProductsByCartId ( ): Promise<void> {
        const observable = this.http.get<ProductCartModel[]>(this.config.getCartProductsByCartID + this.cart.cartID)
        this.products = await firstValueFrom(observable);

        this.productsTotalAmountAndPrice();
    }

    public async changeProductAmount(product: ProductCartModel):Promise<void>{        
        
        const i = this.products.findIndex(p => p.productID === product.productID);
        
        if( i !== -1 && product.amount > 0) {
            product.cartProductID = this.products[i].cartProductID;
            this.products[i] = await this.updateProduct(product);
            this.productsTotalAmountAndPrice();
            return;
        }
        
        if( product.amount === 0) {            
            await this.deleteProduct(product.cartProductID);
            return;
        }

        const observable = this.http.post<ProductCartModel>(this.config.addCartProduct, product);
        this.products.push(await firstValueFrom(observable));
        this.productsTotalAmountAndPrice()
    }

    public async updateProduct( product: ProductCartModel ): Promise<ProductCartModel> {

        const Observable = this.http.put<ProductCartModel>(this.config.updateOneCartProduct, product);
        const newProduct = await firstValueFrom(Observable);

        return newProduct;
    }


    public async deleteProduct(cartProductID: number):Promise<void>{

        const observable = this.http.delete(this.config.removeOneCartProduct + cartProductID);
        await firstValueFrom(observable);

        this.products = this.products.filter(p => p.cartProductID !== cartProductID)
        this.productsTotalAmountAndPrice();
    }    

    public async deleteAllProducts():Promise<void>{

        const observable = this.http.delete(this.config.removeAllCartProducts);
        await firstValueFrom(observable);

        this.products = []
        this.totalAmount =  0;
        this.totalPrice = 0;
    }   
    public productsTotalAmountAndPrice(): void{
        let sum = 0;
        let count = 0;

        for(const product of this.products){
            sum += product.price;
            count += product.amount;
        }

        this.totalAmount = count;
        this.totalPrice = sum;
    }

    
    // public productsTotalPrice(): number{
    //     let sum = 0;
        
    //     for(const product of this.products){
    //         sum += product.price;
    //     }

    //     return sum;
    // }


}
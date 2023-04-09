import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

    private baseUrl = "http://localhost:3001/api/";

    public operations = this.baseUrl + "operations/";

    public login = this.baseUrl + "auth/login";
    public register = this.baseUrl + "auth/register";

    public createCart = this.baseUrl + "create_cart";
    public getCartID = this.baseUrl + "cart_id";
    public getCartProducts = this.baseUrl + "all_cart_products";
    public addCartProduct = this.baseUrl + "add_cart_product";
    public updateOneCartProduct = this.baseUrl + "update_one_cart_product";
    public updateFullCart = this.baseUrl + "update_cart_products";
    public removeOneCartProduct = this.baseUrl + "remove_one_cart_product";
    public removeAllCartProducts = this.baseUrl + "remove_cart_products";

    public createOrder = this.baseUrl + "create_order"; 

    public getAllCategories = this.baseUrl + "categories";
    public getRandomProducts = this.baseUrl + "random_products";
    public searchProducts = this.baseUrl + "search_products";
    public getProductsByCategory = this.baseUrl + "products_by_category";
    public addProduct = this.baseUrl + "add_product";
    public deleteProduct = this.baseUrl + "delete_product";
    public updateProduct = this.baseUrl + "update_product";
}
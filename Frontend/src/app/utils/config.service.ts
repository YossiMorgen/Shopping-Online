import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public frontUtl = "http://localhost:3000/"
  public receiptUrl = "http://localhost:3000/reciept";

  private baseUrl = "http://localhost:3001/api/";

  public login = this.baseUrl + "auth/login";
  public register = this.baseUrl + "auth/register";
  public isEmailExist = this.baseUrl + "auth/is_email_exist/";

  public createCart = this.baseUrl + "create_cart";
  public getCartDetails = this.baseUrl + "cart_details";
  public getCartProductsByCartID = this.baseUrl + "cart_products_by_cart_id/";
  public addCartProduct = this.baseUrl + "add_cart_product";
  public updateOneCartProduct = this.baseUrl + "update_one_cart_product/";
  public removeOneCartProduct = this.baseUrl + "remove_one_cart_product/";
  public removeAllCartProducts = this.baseUrl + "remove_cart_products/";

  public createOrder = this.baseUrl + "create_order"; 
  public ordersAndProductsAmount = this.baseUrl + 'orders_and_products_amount';
  public getBusyDates = this.baseUrl + 'get_busy_dates';

  public getAllCategories = this.baseUrl + "categories";
  public getRandomProducts = this.baseUrl + "random_products";
  public searchProducts = this.baseUrl + "search_products/";
  public getProductsByCategory = this.baseUrl + "products_by_category/";
  public addProduct = this.baseUrl + "add_product";
  public deleteProduct = this.baseUrl + "delete_product/";
  public updateProduct = this.baseUrl + "update_product/";
}
import { CartService } from 'src/app/services/cart.service';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import Order from '../models/product-models/order.model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    public order: Order;

    public constructor( 
        private http: HttpClient, 
        private config: ConfigService,
        private cartService: CartService
    ) { }

    public async makeAnOrder(order: Order) {
        
        const observable = this.http.post<Order>(this.config.createOrder, order);
        this.order = (await firstValueFrom(observable))

    }

    
    public regex : string;

    public changeRegexSearch(args: string): void{
        // this.regex = new RegExp("\\b("+args+"\\b)");  
        // this.regex = `/${args}/i`  
        this.regex = args;    
    }
}
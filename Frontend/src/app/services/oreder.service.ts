import { CartService } from 'src/app/services/cart.service';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import Order from '../models/product-models/order.model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';

type DeliveryDate = {
    deliveryDate: Date;
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    public order: Order;
    public search : string;

    public constructor( 
        private http: HttpClient, 
        private config: ConfigService,
        private cartService: CartService
    ) { }

    public async makeAnOrder(order: Order) {
        const observable = this.http.post<Order>(this.config.createOrder, order);
        this.order = await firstValueFrom(observable)
        this.cartService.cart.ordered = 1
    }

    public async getBusyDates(): Promise<DeliveryDate[]>{
        const observable = this.http.get<DeliveryDate[]>(this.config.getBusyDates);
        return firstValueFrom(observable);
    }

}
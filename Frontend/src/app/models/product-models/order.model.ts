export default class Order{

    public orderID: number;
    public cartID: number;
    public userID: number;
    public price: number;
    public city: string;
    public street: string;
    public deliveryDate: Date;
    public orderDate: Date;
    public creditCard: string;

    constructor(order?: Order | any){
        if(order){
            this.cartID = order.cartID;
            this.userID = order.userID;
            this.price = order.price;
            this.city = order.city;
            this.street = order.street;
            this.deliveryDate = order.deliveryDate;
            this.orderDate = order.orderDate;
            this.creditCard = order.creditCard;
        }
    }
}
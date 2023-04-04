export default class OrdersModel{

    public orderID: number;
    public cartID: number;
    public userID: number;
    public price: number;
    public city: string;
    public street: string;
    public deliveryDate: Date;
    public orderDate: Date;
    public CreditDetail: number;

    public constructor(product: OrdersModel){
        this.orderID = product.orderID;
        this.cartID = product.cartID;
        this.userID = product.userID;
        this.price = product.price;
        this.city = product.city;
        this.street = product.street;
        this.deliveryDate = product.deliveryDate;
        this.orderDate = product.orderDate;
    }

}
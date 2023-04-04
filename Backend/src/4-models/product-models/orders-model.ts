import Joi from "joi";

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

    public static validationSchema = Joi.object({
        orderID: Joi.number().optional().integer().positive(),
        cartID: Joi.number().optional().integer().positive(),
        userID: Joi.number().optional().integer().positive(),
        price: Joi.number().positive().required(),
        city: Joi.string().min(2).max(30).required(),
        street: Joi.string().min(2).max(200).required(),
        deliveryDate: Joi.date().required(),
        orderDate: Joi.date().required(),
        CreditDetail: Joi.number().positive().max(9999).required()
    })

    public validation():string{
        const res = OrdersModel.validationSchema.validate(this);
        return res.error?.message;
    }

}
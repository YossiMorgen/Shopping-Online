import { OkPacket } from 'mysql';
import { ValidationErrorModel } from '../../4-models/error-models';
import OrdersModel from "../../4-models/product-models/orders-model";
import dal from '../../2-utils/dal';

async function addOrder( order : OrdersModel): Promise<OrdersModel> {
    
    const err = order.validation();
    if(err) throw new ValidationErrorModel(err);
    
    const sql = 'INSERT INTO orders VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?)'
    const values = [order.orderID, order.cartID, order.price, order.city, order.street, order.deliveryDate, order.orderDate, order.CreditDetail]

    const info: OkPacket = await dal.execute(sql, values);
    order.orderID = info.insertId;

    return order;
}
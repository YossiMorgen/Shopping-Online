import { OkPacket } from 'mysql';
import { ValidationErrorModel } from '../../4-models/error-models';
import OrdersModel from "../../4-models/product-models/orders-model";
import dal from '../../2-utils/dal';

async function addOrder( order : OrdersModel): Promise<OrdersModel> {
    
    const err = order.validation();
    if(err) throw new ValidationErrorModel(err);

    let info: OkPacket = await dal.execute(`UPDATE shopping_cart SET ordered = 1 WHERE cartID = ? AND userID = ? AND ordered = 0`, [order.cartID, order.userID])
    if(info.affectedRows === 0) throw new ValidationErrorModel(`cart does'nt exist or it's not yours`);

    const sql = 'INSERT INTO orders VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?)'
    const values = [ order.cartID, order.userID, order.price, order.city, order.street, order.deliveryDate, new Date(), order.creditCard]

    info = await dal.execute(sql, values);
    order.orderID = info.insertId;


    return order;
}


async function getOrdersAmount() {
    return await dal.execute('SELECT COUNT(*) as amount FROM orders ')[0]['amount']
    
}
export default {
    addOrder,
    getOrdersAmount
}
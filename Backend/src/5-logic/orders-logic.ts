import { OkPacket } from 'mysql';
import { ValidationErrorModel } from '../4-models/error-models';
import OrdersModel from "../4-models/product-models/orders-model";
import dal from '../2-utils/dal';

async function addOrder( order : OrdersModel): Promise<OrdersModel> {
    
    const err = order.validation();
    if(err) throw new ValidationErrorModel(err);
    
    const isBusy = await dal.execute(`
        SELECT COUNT(*) AS amount 
        FROM orders
        WHERE deliveryDate = ?
        `, 
        [order.deliveryDate]
    )

    if(isBusy[0]['amount']) throw new ValidationErrorModel("We can't have any more orders this day we are too busy")
    
    const price = await dal.execute(` 
        SELECT SUM(products.price * cart_product.amount ) AS price
        FROM cart_product
        LEFT JOIN products
        ON cart_product.productID = products.productID
        WHERE cartID = ?`, 
        [order.cartID]
    )

    if(price[0]['price'] !== order.price) {
        throw new ValidationErrorModel(`The price is ${price[0]['price']} please refresh the page`)
    }
    
    let info: OkPacket = await dal.execute(`UPDATE shopping_cart SET ordered = 1 WHERE cartID = ? AND userID = ? AND ordered = 0`, [order.cartID, order.userID])
    if(info.affectedRows === 0) throw new ValidationErrorModel(`cart does'nt exist or it's not yours`);

    const sql = 'INSERT INTO orders VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?)'
    const values = [ order.userID, order.cartID, order.price, order.city, order.street, order.deliveryDate, new Date(), order.creditCard]

    info = await dal.execute(sql, values);
    order.orderID = info.insertId;


    return order;
}


async function getOrdersAmount() {
    const amount = await dal.execute('SELECT COUNT(*) as amount FROM orders');
    return amount[0]['amount'];
}

async function getBusyDates(){
    const sql = `
        SELECT deliveryDate
        FROM orders
        GROUP BY deliveryDate
        HAVING COUNT(*) > 2 `
    // const sql = `SELECT deliveryDate FROM orders`
    const dates = await dal.execute(sql);    
    return dates;
}
export default {
    addOrder,
    getOrdersAmount,
    getBusyDates
}
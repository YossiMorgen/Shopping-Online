import { ResourceNotFoundErrorModel } from '../../4-models/error-models';
import { OkPacket } from 'mysql';
import { ValidationErrorModel } from "../../4-models/error-models";
import dal from '../../2-utils/dal';
import ProductCartModel from '../../4-models/product-models/product_cart-model';

async function createCart(userID: number): Promise<object>{
    const date = new Date();
    const info: OkPacket = await dal.execute('INSERT INTO shopping_cart VALUES (DEFAULT, ?, ?)', [userID, date]);
    return {userID, cartID: info.insertId, productionDate : date}
}

async function getCart(userID: number): Promise<number> {
    return dal.execute('SELECT * FROM `shopping_cart` WHERE `userID` =?', [userID])[0];
}

function getCartProducts(cartID: number): Promise<ProductCartModel[]> {
    return dal.execute('SELECT * FROM `cart_product` WHERE `cartID` =?', [cartID]);
}

async function addCartProduct( product : ProductCartModel): Promise<ProductCartModel> {
    
    const err = product.validation();
    if(err) throw new ValidationErrorModel(err);
    
    const sql = 'INSERT INTO products VALUES (DEFAULT, ?, ?, ?)'
    const values = [product.productID, product.amount, product.cartID]

    const info: OkPacket = await dal.execute(sql, values);
    product.productID = info.insertId;

    return product;
}

async function updateCartProduct( product : ProductCartModel): Promise<ProductCartModel> {
     
    const err = product.validation();
    if(err) throw new ValidationErrorModel(err);
    
    const sql = 'UPDATE products SET amount =?, cartID = ? WHERE cartProductID = ?'
    const values = [product.amount, product.cartID, product.cartProductID]

    const info: OkPacket = await dal.execute(sql, values);
    if(info.affectedRows === 0)  throw new ResourceNotFoundErrorModel(product.cartProductID);

    return product;
}

async function updateCartProducts( products : Array<ProductCartModel>): Promise<void> {
    for(let i = 0; i < products.length; i++) {
        const err = products[i].validation();
        if(err) throw new ValidationErrorModel(err);
        
        const sql = 'UPDATE products SET amount =?, cartID = ? WHERE cartProductID = ?'
        const values = [products[i].amount, products[i].cartID, products[i].cartProductID]

        const info: OkPacket = await dal.execute(sql, values);
        if(info.affectedRows === 0)  throw new ResourceNotFoundErrorModel(products[0].cartProductID);
    }
}

function deleteCartProduct(cartProductID: number) {
    const sql = "DELETE FROM cart_product WHERE cartProductID =?";
    return dal.execute(sql, [cartProductID]); 
}

function deleteCartProducts(cartID: number) {
    const sql = "DELETE FROM cart_product WHERE cartID =?";
    return dal.execute(sql, [cartID]); 
}

export default {
    createCart,
    getCart,
    getCartProducts,
    addCartProduct,
    updateCartProduct,
    updateCartProducts,
    deleteCartProduct,
    deleteCartProducts
}
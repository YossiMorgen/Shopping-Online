import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/auth-middlewares/verify-logged-in";
import cardProductLogic from "../5-logic/products-logic/card-product-logic";
import ProductCartModel from "../4-models/product-models/product_cart-model";
const router = express.Router();

router.get('/cart/:userID([9-0]+)', verifyLoggedIn,  async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const cartID = await cardProductLogic.getCart(+req.params.userID);   
        res.send(cartID);
    } catch (error) {
        next(error);
    }
});


router.get('/cart_products/:cartID([9-0]+)', verifyLoggedIn,  async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const products = await cardProductLogic.getCartProducts(+req.params.cartID);   
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.post('/cart_products', verifyLoggedIn,  async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const product = new ProductCartModel(req.body);   
        const newProduct = await cardProductLogic.addCartProduct(product);   
        res.json(newProduct);
    } catch (error) {
        next(error);
    } 
});


export default router
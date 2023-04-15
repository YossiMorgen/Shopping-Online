import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/auth-middlewares/verify-logged-in";
import cardProductLogic from "../5-logic/products-logic/card-product-logic";
import ProductCartModel from "../4-models/product-models/product_cart-model";
import cyber from "../2-utils/cyber";
import User from "../4-models/auth-models/user-model";
const router = express.Router();

router.get('/create_cart', async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const decodeUser: User = await cyber.getDecodeToken(req);
        const cart = await cardProductLogic.createCart(decodeUser.userID);
        
        res.json(cart);

    } catch (error) {
        next(error);
    }
})

router.get('/cart_details',  async (req: Request, res: Response, next: NextFunction) => {
    try { 

        const decodeUser: User = await cyber.getDecodeToken(req);
        const cart = await cardProductLogic.getCart(decodeUser.userID);   
        console.log(cart);
        
        res.json(cart);

    } catch (error) {
        next(error);
    }
});


router.get('/cart_products/:cart_id([0-9]+)', verifyLoggedIn,  async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const products = await cardProductLogic.getCartProducts(+req.params.cart_id);   
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.post('/add_cart_product', verifyLoggedIn,  async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const product = new ProductCartModel(req.body);   
        const newProduct = await cardProductLogic.addCartProduct(product);   
        res.json(newProduct);
    } catch (error) {
        next(error);
    } 
});

router.put('/update_one_cart_product', verifyLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartProduct = new ProductCartModel(req.body);
        const newProduct = await cardProductLogic.updateCartProduct(cartProduct);
        res.json(newProduct);
    } catch (error) {
        next(error);
    }
})

router.put('/update_cart_products', verifyLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartProduct: ProductCartModel[] = req.body;
        const newProduct = await cardProductLogic.updateCartProducts(cartProduct);
        res.json(newProduct);
    } catch (error) {
        next(error);
    }
})

router.delete('/remove_one_cart_product/:cart_product_id([0-9]+)', verifyLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartProductID = +req.params.cart_product_id;
        await cardProductLogic.deleteCartProduct(cartProductID);
     
        res.sendStatus(204)
    } catch (error) {
        next(error);
    }
})

router.delete('/remove_cart_products/:cart_id([0-9]+)', verifyLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartID = +req.params.cart_id;
        await cardProductLogic.deleteCartProduct(cartID);
      
        res.sendStatus(204)
    } catch (error) {
        next(error);
    }
})

export default router;
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
        const cartID = await cardProductLogic.createCart(decodeUser.userID);
        
        res.send(cartID);

    } catch (error) {
        next(error);
    }
})

router.get('/cart)',  async (req: Request, res: Response, next: NextFunction) => {
    try { 

        const decodeUser: User = await cyber.getDecodeToken(req);
        const cartID = await cardProductLogic.getCart(decodeUser.userID);   
        
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

router.put('/cart_product', verifyLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartProduct = new ProductCartModel(req.body);
        const newProduct = await cardProductLogic.updateCartProduct(cartProduct);
        res.json(newProduct);
    } catch (error) {
        next(error);
    }
})

router.put('/cart_product', verifyLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartProduct: ProductCartModel[] = req.body;
        const newProduct = await cardProductLogic.updateCartProducts(cartProduct);
        res.json(newProduct);
    } catch (error) {
        next(error);
    }
})

router.delete('/cart_product/cart_product_id([9-0]+)', verifyLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartProductID = +req.params.cart_product_id;
        await cardProductLogic.deleteCartProduct(cartProductID);
     
        res.sendStatus(204)
    } catch (error) {
        next(error);
    }
})

router.delete('/cart_products/cart_id([9-0]+)', verifyLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartID = +req.params.cart_id;
        await cardProductLogic.deleteCartProduct(cartID);
      
        res.sendStatus(204)
    } catch (error) {
        next(error);
    }
})

export default router;
import express, { NextFunction, Request, Response } from "express";
import productsLogic from "../5-logic/products-logic/products-logic";
import verifyLoggedIn from "../3-middleware/auth-middlewares/verify-logged-in";
import verifyAdmin from '../3-middleware/auth-middlewares/verify-admin';
import cyber from "../2-utils/cyber";
import ProductModel from "../4-models/product-models/product-model";

const router = express.Router();

router.get('/categories', verifyLoggedIn,  async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const categories = await productsLogic.getCategories();        
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

router.get('/random_products', verifyLoggedIn,  async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const products = await productsLogic.getRandomProducts((+req.query.start | 0), (+req.query.limit | 10));        
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/search_products/:name', verifyLoggedIn,  async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const products = await productsLogic.getProductsByName(req.params.name, (+req.query.start | 0), (+req.query.limit | 10));        
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.get('/products_by_category/:categoryID([0-9]+)', verifyLoggedIn,  async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const categoryID = +req.params.categoryID;
        const products = await productsLogic.getProductsByCategory(categoryID, (+req.query.start | 0), (+req.query.limit | 10));        
        res.json(products);
    } catch (error) {
        next(error);
    }
});

router.post('/add_products', verifyAdmin, async (req: Request, res: Response, next: NextFunction)=>{
    try {
        req.body.image = req.files?.image;
        
        const product = new ProductModel(req.body);
        
        const newProduct = await productsLogic.addProduct(product);
        res.status(201).json(newProduct);

    } catch (error) {
        next(error);
    }
});

router.delete('/delete_product/:productID([0-9]+)', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productsLogic.deleteProduct(+req.params.productID);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
})

router.put('/update_product/:id([0-9]+)', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        req.body.image = req.files?.image;
        const product = new ProductModel(req.body);
        product.productID = +req.params.id;

        const newProduct = await productsLogic.updateProduct(product);
        
        res.status(201).json(newProduct);

    } catch (error) {
        next(error);
    }

})

export default router;
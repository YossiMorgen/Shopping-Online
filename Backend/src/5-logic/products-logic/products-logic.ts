import { OkPacket } from 'mysql';
import dal from "../../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from '../../4-models/error-models';
import fileHandler from '../../2-utils/file-handler';
import fileUpload, { UploadedFile } from 'express-fileupload';
import appConfig from '../../2-utils/AppConfig';
import ProductModel from '../../4-models/product-models/product-model';
import CategoryModel from '../../4-models/product-models/category-model';

function getCategories():Promise<CategoryModel> {
    return dal.execute('SELECT * FROM categories');
}

function getRandomProducts (start: number, end: number): Promise<ProductModel[]> {
    const sql = "SELECT productID, productName, price,  CONCAT(?, imageName) AS imageName FROM products";
    return dal.execute(sql, ["http://localhost:3001/"])
}

async function getProductsByName(name : string, start: number, end: number): Promise<ProductModel[]> {
    const [product] = await dal.execute(
        `SELECT * FROM products WHERE name LIKE %?%
    `, [name]);

    return product;
}

async function getProductsByCategory(categoryID: number,start: number, end: number): Promise<ProductModel[]> {
    const products = await dal.execute(
        `SELECT productID, productName, price,  CONCAT(?, imageName) AS imageName 
        FROM products
        WHERE products.categoryID = ?
        LIMIT ?
        OFFSET ?
    `, [appConfig.nodeUrl, categoryID, end, start]);

    return products;
}

async function addProduct(product:ProductModel): Promise<ProductModel> {
    
    const err = product.validation();
    if(err) throw new ValidationErrorModel(err);

    product.imageName = await fileHandler.saveFile(product.image);
    delete product.image;
    
    const sql = "INSERT INTO products VALUES (DEFAULT, ?, ?, ?, ?)";
    const info:OkPacket = await dal.execute(sql, [product.productName, product.categoryID, product.price, product.imageName]);
    
    product.productID = info.insertId;
    
    return product; 
}


async function updateProduct(product: ProductModel): Promise<ProductModel> {        
    
    const err = product.validation();
    if(err) throw new ValidationErrorModel(err); 

    
    let sql = "UPDATE products SET productName = ?, price = ?"
    const arr: Array<any> = [product.productName, product.price]

    
    if(product.image){

        const oldProduct  = await getOneProduct(product.productID)[0];
        fileHandler.deleteFile(oldProduct.imageName);

        product.imageName = await fileHandler.saveFile(product.image);
        delete product.image;

        sql += " , imageName =?";
        arr.push(product.imageName);
    }
    
    sql += ` WHERE productID = ?`
    arr.push(product.productID);

    const info: OkPacket = await dal.execute(sql, [...arr]);     
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(product.productID);
    product.imageName = appConfig.nodeUrl + product.imageName

    return product;
}

// async function isProductNameExist(productName: string): Promise<boolean> {

//     const sql = `SELECT COUNT(*) as productName FROM users WHERE productName = ?`;
//     const count = await dal.execute(sql,[productName]);
    
//     return count[0].productName > 0;
// }

async function getOneProduct(id:number): Promise<ProductModel> {

    const res = await dal.execute("SELECT * FROM products WHERE productId =?", [id]);
    if(res.length === 0) throw new ResourceNotFoundErrorModel(id);

    return res[0];  
}

async function deleteProduct(id:number): Promise<void> {

    const oldProduct = await getOneProduct(id);
    fileHandler.deleteFile(oldProduct.imageName);
    const sql = "DELETE FROM products WHERE productID =?";
    dal.execute(sql, [id]);

}


export default {
    getProductsByCategory,
    getRandomProducts,
    getProductsByName,
    addProduct,
    deleteProduct,
    getCategories,
    updateProduct,
};









import { OkPacket } from 'mysql';
import dal from "../../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from '../../4-models/error-models';
import fileHandler from '../../2-utils/file-handler';
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

async function getOneProduct(id:number): Promise<ProductModel> {

    const res = await dal.execute(
        `SELECT productID, productName, price,  CONCAT(?, imageName) AS imageName, categoryID
        FROM products 
        WHERE productId =?`,
        [appConfig.nodeUrl, id]
    );
    if(res.length === 0) throw new ResourceNotFoundErrorModel(id);
        
    console.log(res);
        
    return res[0];  
}

async function addProduct(product:ProductModel): Promise<ProductModel> {
    
    const err = product.validation();
    if(err) throw new ValidationErrorModel(err);

    product.imageName = await fileHandler.saveFile(product.image);
    delete product.image;
    
    const sql = "INSERT INTO products VALUES (DEFAULT, ?, ?, ?, ?)";
    const info:OkPacket = await dal.execute(sql, [product.productName, product.categoryID, product.price, product.imageName]);
    
    product.productID = info.insertId;
    product.imageName = appConfig.nodeUrl + product.imageName;
    return product; 
}


async function updateProduct(product: ProductModel): Promise<ProductModel> {        
    
    const err = product.validation();
    if(err) throw new ValidationErrorModel(err); 

    
    let sql = "UPDATE products SET productName = ?, price = ?, categoryID = ?"
    const arr: Array<any> = [product.productName, product.price, product.categoryID]

    
    if(product.image){        

        const products = await dal.execute(`SELECT imageName FROM products WHERE productID = ?`, [product.productID]);
        const oldProduct = products[0];    
        fileHandler.deleteFile(oldProduct.imageName);
        
        product.imageName = await fileHandler.saveFile(product.image);
        delete product.image;

        sql += " , imageName =?";
        arr.push(product.imageName);

        product.imageName = appConfig.nodeUrl + product.imageName
    
    }
    
    sql += ` WHERE productID = ?`
    arr.push(product.productID);

    const info: OkPacket = await dal.execute(sql, arr);     
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(product.productID);

    return product;
}

// async function isProductNameExist(productName: string): Promise<boolean> {

//     const sql = `SELECT COUNT(*) as productName FROM users WHERE productName = ?`;
//     const count = await dal.execute(sql,[productName]);
    
//     return count[0];
// }



async function deleteProduct(id:number): Promise<void> {

    const products = await dal.execute(`SELECT imageName FROM products WHERE productID = ?`, [id]);
    const oldProduct = products[0];    
    fileHandler.deleteFile(oldProduct.imageName);

    dal.execute("DELETE FROM products WHERE productID =?", [id]);

}


export default {
    getProductsByCategory,
    getRandomProducts,
    getProductsByName,
    getOneProduct,
    addProduct,
    deleteProduct,
    getCategories,
    updateProduct,
};









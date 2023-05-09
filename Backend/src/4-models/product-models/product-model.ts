import { UploadedFile } from 'express-fileupload';
import Joi from "joi";

export default class ProductModel{

    public productID: number;
    public productName: string; 
    public categoryID : number;
    public price: number;
    public image: UploadedFile;
    public imageName: string;
    public description: string;
    public weight: string;

    public constructor(product: ProductModel){
        this.productID = product.productID;
        this.productName = product.productName;
        this.categoryID  = product.categoryID;
        this.price = product.price;
        this.image = product.image;
        this.imageName = product.imageName;
        this.description = product.description;
        this.weight = product.weight;
    }

    public static validationSchema = Joi.object({
        productID: Joi.number().optional().integer().positive(),
        productName: Joi.string().required(),
        categoryID : Joi.number().required().positive(),
        price: Joi.number().positive().required(),
        image: Joi.object().optional(),
        imageName: Joi.string().optional()
    })

    public validation():string{
        const res = ProductModel.validationSchema.validate(this);
        return res.error?.message;
    }

}
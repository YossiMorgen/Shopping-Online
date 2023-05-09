import WeightModel from "./weight-model";

export default class ProductModel{
    public productID: number;
    public productName: string; 
    public categoryID : number;
    public price: number;
    public image: File;
    public imageName: string;
    public description: string;
    public weight: number;
    public weightType: WeightModel;

    constructor(product?: ProductModel | any){
        if(product){
            this.productID = product.productID;
            this.productName = product.productName;
            this.categoryID = product.categoryID;
            this.price = product.price;
            this.image = product.image;
            this.imageName = product.imageName;
            this.description = product.description;
            this.weight = product.weight;
            this.weightType = product.weightType;
        }
    }

}
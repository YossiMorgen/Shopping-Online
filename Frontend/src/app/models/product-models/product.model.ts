import WeightModel from "./weight.model";

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
    public unitsInStock: number;
}
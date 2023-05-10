import WeightModel from "./weight-model";

export default class ProductCartModel{

    public cartProductID: number;
    public productID: number;
    public amount: number;
    public price: number;
    public cartID: number;
    public productName: string;
    public imageName: string;
    public weight: number;
    public weightType: WeightModel;
}
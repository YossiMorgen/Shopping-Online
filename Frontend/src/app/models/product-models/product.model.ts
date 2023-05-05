export default class ProductModel{
    public productID: number;
    public productName: string; 
    public categoryID : number;
    public price: number;
    public image: File;
    public imageName: string;

    constructor(product?: ProductModel | any){
        if(product){
            this.productID = product.productID;
            this.productName = product.productName;
            this.categoryID = product.categoryID;
            this.price = product.price;
            this.image = product.image;
            this.imageName = product.imageName;
        }
    }

}
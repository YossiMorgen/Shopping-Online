export default class ProductModel{

    public productID: number;
    public productName: string; 
    public categoryID : number;
    public price: number;
    public image: FileList;
    public imageName: string;

    public constructor(product: ProductModel){
        this.productID = product.productID;
        this.productName = product.productName;
        this.categoryID  = product.categoryID;
        this.price = product.price;
        this.image = product.image;
        this.imageName = product.imageName;
    }

}
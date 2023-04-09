export default class ProductCartModel{

    public cartProductID: number;
    public productID: number;
    public amount: number;
    public price: number;
    public cartID: number;

    public constructor(product: ProductCartModel){
        this.cartProductID = product.cartProductID;
        this.productID = product.productID;
        this.amount = product.amount;
        this.price = product.price;
        this.cartID = product.cartID;
    }

}
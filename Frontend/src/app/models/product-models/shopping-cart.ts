class ShoppingCart{
    public cartID: number;
    public userID: number;
    public productionDate: Date;

    constructor(user: ShoppingCart) {
        this.cartID = user.cartID;
        this.userID = user.userID;
        this.productionDate = new Date(user.productionDate);
    }

}
export default ShoppingCart
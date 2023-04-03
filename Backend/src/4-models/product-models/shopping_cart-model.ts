import Joi from "joi";
import RoleModel from '../auth-models/role-model';



class ShoppingCart{
    public cartID: number;
    public userID: number;
    public productionDate: Date;

    constructor(user: ShoppingCart) {
        this.cartID = user.cartID;
        this.userID = user.userID;
        this.productionDate = new Date(user.productionDate);
    }

    public static validationSchema = Joi.object({
        cartID: Joi.number().integer().positive().required(),
        userID: Joi.number().integer().positive().required(),
        productionDate: Joi.date().required()
    })

    public validation():string{
        const res = ShoppingCart.validationSchema.validate(this);
        return res.error?.message;
    }
}
export default ShoppingCart
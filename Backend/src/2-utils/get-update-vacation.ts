import VacationModel from "../4-models/product-models/product_cart-model";

export default function getUpdateVacation(vacation1: any, vacation2: any): VacationModel{
    for (const key in vacation2) {
        if(vacation2[key] !== undefined && vacation2[key] !== ""){
            vacation1[key] = vacation2[key];
        }
    }
    return vacation1;
}
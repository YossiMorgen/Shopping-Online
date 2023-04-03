import VacationModel from "../4-models/product-models/product_cart-model";

function createUpdateVacationSql(vacation: VacationModel) {
    let sql = `UPDATE vacation SET`;
    let arr = [];
    for (const key in vacation) {
        if(vacation[key] !== undefined && vacation[key] !== '') {
            if(key == 'validation'){
                break;
            }
            sql += ` ${key} =?,`;
            arr.push(vacation[key]);
        }
    }

    sql = sql.slice(0, sql.length - 1);
    sql += ` WHERE vacationId = ?`
    arr.push(vacation.vacationId);

    return {sql, arr};
}

export default createUpdateVacationSql;
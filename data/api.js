import { itemPriceModel } from "./models/itemModel.js";

export const insertItems = async (items) => {
    itemPriceModel.insertMany(items, function(err, result) {
        if (err) {
            console.log("Error saving entry to database: " + err);
            return;
        }
        console.log("SUCCESS. Item data saved to DB: " + result);
    });
}

export const getItemCount = async () => {
    return itemPriceModel.count();
}
import mongoose from "mongoose";

const itemPrice = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        date: {
            dateString: String,
            unix: Number
        },
        itemName: String,
        currentPrice: {
            rough: String,
            exact: String
        },
        priceChanges: {
            todaysChange: {
                rough: String,
                exact: String,
                percent: String
            },
            montlyChange: {
                rough: String,
                exact: String,
                percent: String
            },
            quarterlyChange: {
                rough: String,
                exact: String,
                percent: String
            },
            semiAnnualChange: {
                rough: String,
                exact: String,
                percent: String
            }
        }
    },
    { collection: "item_prices" }
);

export const itemPriceModel = mongoose.model("item_prices", itemPrice);
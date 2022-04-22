import config from "./config.js";

export const getItemNameFilePath = (itemName) => {
    return `${config.ITEM_COLLECTION_PATH}/${itemName.toLocaleLowerCase().replaceAll(" ", "_")}.txt`;
}
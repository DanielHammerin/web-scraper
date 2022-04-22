import { scrapeUrls } from "./scraper.js";
import config from "./config.js";
import dotenv from "dotenv/config";
import { connectToDb, disconnect } from "./db.js";
import { insertItems } from "./data/api.js";
import { existsSync, mkdirSync } from "fs";
import { appendFile } from "fs/promises";
import { getItemNameFilePath } from "./utils.js";

// Create item collection directory if not exists.
if (!existsSync(config.ITEM_COLLECTION_PATH)) {
    console.log("Creating collection directory.");
    mkdirSync(config.ITEM_COLLECTION_PATH);
}

const start = async () => {
    console.log("Starting service.");

    // await connectToDb();
    // const items = await scrapeData();
    // await insertItems(items);
    // setTimeout(() => {
    //     disconnect();
    // }, 5000);

    const items = await scrapeData();
    saveScrapedItemData(items);
};

const saveScrapedItemData = (items) => {
    try {
        for (const item of items) {
            const itemFilePath = getItemNameFilePath(item.itemName);
            appendFile(itemFilePath, JSON.stringify(item, null, '\t') + ',\n', "utf-8")
                .then(() => {
                    console.log(`Appended new data to ${itemFilePath}`);
                })
                .catch(() => {
                    console.log(`Error appending new data to ${itemFilePath}`);
                })
        }
        
    } catch (err) {
        console.log("ERROR: " + err);
    }
}

const scrapeData = async () => {
    console.log("Starting web scraper.");
    console.log("Scraping " + config.URLS.length + " urls for data...");
    const itemArray = await scrapeUrls(config.URLS);
    return itemArray;
};

start();

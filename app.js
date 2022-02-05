import { scrapeUrls } from "./scraper.js";
import config from "./config.js";
import dotenv from "dotenv/config";
import { connectToDb, disconnect } from "./db.js";
import { insertItems } from "./data/api.js";

const start = async () => {
    console.log("Starting service.");

    await connectToDb();
    const items = await scrapeData();
    await insertItems(items);
    setTimeout(() => {
        disconnect();
    }, 5000);
};

const scrapeData = async () => {
    console.log("Starting web scraper.");
    console.log("Scraping " + config.URLS.length + " urls for data...");
    const itemArray = await scrapeUrls(config.URLS);
    return itemArray;
};

start();
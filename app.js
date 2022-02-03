import {scrapeUrls} from "./scraper.js";
import config from "./config.js";
import dotenv from "dotenv/config";
import {connectToDb, disconnect} from "./db.js";

const start = async () => {
    console.log("Starting service.");

    await connectToDb();
    scrapeData();
    await disconnect();
    
};

const scrapeData = async () => {
    console.log("Starting web scraper.");
    console.log("Scraping " + config.URLS.length + " urls for data...");
    const itemArray = await scrapeUrls(config.URLS);
};

start();
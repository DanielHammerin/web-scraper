import puppeteer from "puppeteer-extra";
import pluginStealth from "puppeteer-extra-plugin-stealth";
import config from "./config.js";

puppeteer.use(pluginStealth());

export const scrapeUrls = async (urls) => {
    let itemScrapes = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let n = 1;

    for (const url of urls) {
        await page.goto(url);
        console.log("Scraping url " + n + " / " + urls.length + " " + url);

        const dateString = await getTimestamp();
        const dateUnix = Date.now();
        const itemStats = await scrapeItemStats(page);
        const todaysChange = await scrape(page, config.PRICE_CONSTANTS.TODAYS_CHANGE_SELECTOR);
        const montlyChange = await scrape(page, config.PRICE_CONSTANTS.MONTHLY_CHANGE_SELECTOR);
        const quarterlyChange = await scrape(page, config.PRICE_CONSTANTS.QUARTERLY_CHANGE_SELECTOR);
        const semiAnnualChange = await scrape(page, config.PRICE_CONSTANTS.SEMI_ANNUAL_CHANGE_SELECTOR);

        const itemObject = {
            date: {
                dateString: dateString,
                unix: dateUnix
            },
            itemName: itemStats.itemName,
            currentPrice: {
                rough: itemStats.currentPrice.rough,
                exact: itemStats.currentPrice.exact
            },
            priceChanges: {
                todaysChange,
                montlyChange,
                quarterlyChange,
                semiAnnualChange
            }
        }

        //const itemObjectJson = JSON.stringify(itemObject, null, 4);
        //console.log(itemObjectJson);
        itemScrapes.push(itemObject);
        n++;
    }
    browser.close();
    return itemScrapes;
};

const scrape = async (page, category) => {
    const [el1] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[' + category + ']/span/span');
    const priceChangeRough = await (await el1.getProperty('innerText')).jsonValue();

    const [el2] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[' + category + ']/span/span');
    const priceChangeExact = await (await el2.getProperty('title')).jsonValue();

    const [el3] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[' + category + ']/span/span[2]');
    const priceChangePercent = await (await el3.getProperty('innerText')).jsonValue();

    return {
        rough: priceChangeRough,
        exact: priceChangeExact,
        percent: priceChangePercent
    }
};

const scrapeItemStats = async (page) => {
    const [el1] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[1]/h2');
    const itemName = await (await el1.getProperty('innerText')).jsonValue();

    const [el2] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/h3/span');
    const currentPriceRough = await (await el2.getProperty('innerText')).jsonValue();

    const [el3] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/h3/span');
    const currentPriceExact = await (await el3.getProperty('title')).jsonValue();

    const itemStatsObject = {
        itemName: itemName,
            currentPrice: {
                rough: currentPriceRough,
                exact: currentPriceExact
            }
    }

    return itemStatsObject;
};

const getTimestamp = async () => {
    let now = new Date();
    let yyyy = now.getFullYear();
    let dd = now.getDate();
    let mm = (now.getMonth() + 1);
    let hours = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds();

    if (dd < 10)
        dd = "0" + dd;

    if (mm < 10)
        mm = "0" + mm;

    const date = yyyy + "-" + mm + "-" + dd;

    if (hours < 10)
        hours = "0" + hours;

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    return date + " " + hours + ":" + minutes + ":" + seconds;
};

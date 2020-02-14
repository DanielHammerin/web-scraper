const puppeteer = require('puppeteer');
const urls = [
    'http://services.runescape.com/m=itemdb_oldschool/Old+school+bond/viewitem?obj=13190',
    'http://services.runescape.com/m=itemdb_oldschool/Kodai+wand/viewitem?obj=21006'
];

/**
 * Price constants dictate which price change "category" to select from.
 */
const PRICE_CONSTANTS = {
    TODAYS_CHANGE_SELECTOR: 1,
    MONTHLY_CHANGE_SELECTOR: 2,
    QUARTERLY_CHANGE_SELECTOR: 3,
    SEMI_ANNUAL_CHANGE_SELECTOR: 4
}

start = () => {
    console.log('Starting web scraper.');
    console.log('Scraping ' + urls.length + ' urls for data...');
    scrapeRunner(urls);
};

scrapeRunner = async (urls) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const url of urls) {
        await page.goto(url);

        const itemStats = await scrapeItemStats(page);
        const todaysChange = await scrape(page, PRICE_CONSTANTS.TODAYS_CHANGE_SELECTOR);
        const montlyChange = await scrape(page, PRICE_CONSTANTS.MONTHLY_CHANGE_SELECTOR);
        const quarterlyChange = await scrape(page, PRICE_CONSTANTS.QUARTERLY_CHANGE_SELECTOR);
        const semiAnnualChange = await scrape(page, PRICE_CONSTANTS.SEMI_ANNUAL_CHANGE_SELECTOR);

        itemObject = {
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

        const itemObjectJson = JSON.stringify(itemObject, null, 4);
        console.log(itemObjectJson);
    }
    browser.close();
};

scrape = async (page, category) => {
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

scrapeItemStats = async (page) => {
    const [el1] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[1]/h2');
    const itemName = await (await el1.getProperty('innerText')).jsonValue();

    const [el2] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/h3/span');
    const currentPriceRough = await (await el2.getProperty('innerText')).jsonValue();

    const [el3] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/h3/span');
    const currentPriceExact = await (await el3.getProperty('title')).jsonValue();

    itemStatsObject = {
        itemName: itemName,
            currentPrice: {
                rough: currentPriceRough, 
                exact: currentPriceExact
            }
    }

    return itemStatsObject;
};

start();
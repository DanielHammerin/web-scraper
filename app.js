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

scrapeRunner = async (urls) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const url of urls) {
        await page.goto(url);

        const itemStats = await scrapeItemStats(page);
        const itemTodaysChange = await scrapeItemTodaysChange(page);
        const itemMontlyChange = await scrapeItemMonthlyChange(page);
        const itemQuarterlyChange = await scrapeItemQuarterlyChange(page);
        const itemSemiannualChange = await scrapeItemSemiAnnualChange(page);

        itemObject = {
            itemName: itemStats.itemName,
            currentPriceRough: itemStats.currentPrice.rough,
            currentPriceExact: itemStats.currentPrice.exact,
            priceChanges: {
                itemTodaysChange,
                itemMontlyChange,
                itemQuarterlyChange,
                itemSemiannualChange
            }
        }

        const itemObjectJson = JSON.stringify(itemObject, null, 4);
        console.log(itemObjectJson);
    }
    browser.close();
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

scrapeItemTodaysChange = async (page) => {
    const [el4] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[1]/span/span');
    const todaysPriceChangeRough = await (await el4.getProperty('innerText')).jsonValue();

    const [el5] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[1]/span/span');
    const todaysPriceChangeExact = await (await el5.getProperty('title')).jsonValue();

    const [el6] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[1]/span/span[2]');
    const todaysPriceChangePercent = await (await el6.getProperty('innerText')).jsonValue();

    todaysPriceObject = {
        todaysPriceChange: {
            rough: todaysPriceChangeRough,
            exact: todaysPriceChangeExact,
            percent: todaysPriceChangePercent
        }
    }

    return todaysPriceObject;
};

scrapeItemMonthlyChange = async (page) => {
    const [el7] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[2]/span/span[1]');
    const monthPriceChangeRough = await (await el7.getProperty('innerText')).jsonValue();

    const [el8] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[2]/span/span[1]');
    const monthPriceChangeExact = await (await el8.getProperty('title')).jsonValue();

    const [el9] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[2]/span/span[2]');
    const monthPriceChangePercent = await (await el9.getProperty('innerText')).jsonValue();

    monthlyPriceObject = {
        monthPriceChange: {
            rough: monthPriceChangeRough,
            exact: monthPriceChangeExact,
            percent: monthPriceChangePercent
        }
    }

    return monthlyPriceObject;
};

scrapeItemQuarterlyChange = async (page) => {
    const [el10] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[3]/span/span[1]');
    const quarterlyPriceChangeRough = await (await el10.getProperty('innerText')).jsonValue();

    const [el11] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[3]/span/span[1]');
    const quarterlyPriceChangeExact = await (await el11.getProperty('title')).jsonValue();

    const [el12] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[3]/span/span[2]');
    const quarterlyPriceChangePercent = await (await el12.getProperty('innerText')).jsonValue();

    quarterlyPriceObject = {
        quarterlyPriceChange: {
            rough: quarterlyPriceChangeRough,
            exact: quarterlyPriceChangeExact,
            percent: quarterlyPriceChangePercent
        }
    }

    return quarterlyPriceObject;
};

scrapeItemSemiAnnualChange = async (page) => {
    const [el13] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[4]/span/span[1]');
    const semiAnnualPriceChangeRough = await (await el13.getProperty('innerText')).jsonValue();

    const [el14] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[4]/span/span[1]');
    const semiAnnualPriceChangeExact = await (await el14.getProperty('title')).jsonValue();

    const [el15] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[4]/span/span[2]');
    const semiAnnualPriceChangePercent = await (await el15.getProperty('innerText')).jsonValue();

    semiAnnualPriceObject = {
        semiAnnualPriceChange: {
                rough: semiAnnualPriceChangeRough,
                exact: semiAnnualPriceChangeExact,
                percent: semiAnnualPriceChangePercent
            }
    }

    return semiAnnualPriceObject;
};

scrapeRunner(urls);
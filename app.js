const puppeteer = require('puppeteer');
const urls = [
    'http://services.runescape.com/m=itemdb_oldschool/Old+school+bond/viewitem?obj=13190'
];

async function scrape(url) {
    puppeteer.launch()
    .then((browser) => {
        return browser.newPage();
    })
    .then(async (page) => {
        await page.goto(url);
        return page.content();
    })
    .then((html) => {
        $('h2', html).each(function() {
            console.log($(this).text());
        });
    })
    .catch((error) => {
        console.log('Error: ' + error);
    })
}

async function scrapee(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el1] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[1]/h2');
    const itemName = await (await el1.getProperty('innerText')).jsonValue();

    const [el2] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/h3/span');
    const currentPriceRough = await (await el2.getProperty('innerText')).jsonValue();

    const [el3] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/h3/span');
    const currentPriceExact = await (await el3.getProperty('title')).jsonValue();


    const [el4] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[1]/span/span');
    const todaysPriceChangeRough = await (await el4.getProperty('innerText')).jsonValue();

    const [el5] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[1]/span/span');
    const todaysPriceChangeExact = await (await el5.getProperty('title')).jsonValue();

    const [el6] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[1]/span/span[2]');
    const todaysPriceChangePercent = await (await el6.getProperty('innerText')).jsonValue();


    const [el7] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[2]/span/span[1]');
    const monthPriceChangeRough = await (await el7.getProperty('innerText')).jsonValue();

    const [el8] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[2]/span/span[1]');
    const monthPriceChangeExact = await (await el8.getProperty('title')).jsonValue();

    const [el9] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[2]/span/span[2]');
    const monthPriceChangePercent = await (await el9.getProperty('innerText')).jsonValue();

    
    const [el10] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[3]/span/span[1]');
    const quarterlyPriceChangeRough = await (await el10.getProperty('innerText')).jsonValue();

    const [el11] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[3]/span/span[1]');
    const quarterlyPriceChangeExact = await (await el11.getProperty('title')).jsonValue();

    const [el12] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[3]/span/span[2]');
    const quarterlyPriceChangePercent = await (await el12.getProperty('innerText')).jsonValue();


    const [el13] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[3]/span/span[1]');
    const semiAnnualPriceChangeRough = await (await el13.getProperty('innerText')).jsonValue();

    const [el14] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[3]/span/span[1]');
    const semiAnnualPriceChangeExact = await (await el14.getProperty('title')).jsonValue();

    const [el15] = await page.$x('//*[@id="grandexchange"]/div/div/main/div[2]/div[2]/ul/li[3]/span/span[2]');
    const semiAnnualPriceChangePercent = await (await el15.getProperty('innerText')).jsonValue();

    console.log({itemName});
    console.log({currentPriceRough});
    console.log({currentPriceExact});

    console.log({todaysPriceChangeRough});
    console.log({todaysPriceChangeExact});
    console.log({todaysPriceChangePercent});

    console.log({monthPriceChangeRough});
    console.log({monthPriceChangeExact});
    console.log({monthPriceChangePercent});

    console.log({quarterlyPriceChangeRough});
    console.log({quarterlyPriceChangeExact});
    console.log({quarterlyPriceChangePercent});

    console.log({semiAnnualPriceChangeRough});
    console.log({semiAnnualPriceChangeExact});
    console.log({semiAnnualPriceChangePercent});

    browser.close();
}

scrapeRunner = async (urls) => {
    while (true) {
        for (const url in urls) {
            await scrape(url);
        }
    }
};

//scrapeRunner(urls);
scrapee(urls[0]);
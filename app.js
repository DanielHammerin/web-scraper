const scraper = require('./scraper');
const config = require('./config');

start = async () => {
    console.log('Starting web scraper.');
    console.log('Scraping ' + config.URLS.length + ' urls for data...');
    const itemArray = await scraper.run(config.URLS);
};

start();
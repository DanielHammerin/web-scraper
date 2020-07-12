# web-scraper
Web scraper for scraping runescape's Grand Exchange.

# How to use the scraper

This project is build on using pupeteer to start a headless browser instance from which to scrape urls.

To scrape urls enter them in the `config.js` in the  `URLS` object. The urls can be gotten from oldschool runescape's grand exchange database items.

Ex:

    http://services.runescape.com/m=itemdb_oldschool/Old+school+bond/viewitem?obj=13190

is one such url.

To install:

    npm i

Run it by navigating to the root of this project directory and run:

    npm run start
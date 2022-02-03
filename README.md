# Web scraper for scraping runescape's Grand Exchange.
Get price changes from GE on osrs site.

# How to use the scraper

This project is build on using pupeteer to start a headless browser instance from which to scrape urls.

To scrape urls enter them in the `config.js` in the  `URLS` object. The urls can be gotten from oldschool runescape's grand exchange database items.

## Example:

    http://services.runescape.com/m=itemdb_oldschool/Old+school+bond/viewitem?obj=13190


# Installation

    npm i

Add an `.env` file in the root of the project that contains the following:

    MONGODB_URI=<your-mongodb-connection-string>

# Run it

Run it by navigating to the root of this project directory and run:

    npm run start


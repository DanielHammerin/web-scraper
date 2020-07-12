/**
 * Price constants dictate which price change "category" to select from.
 */
PRICE_CONSTANTS = {
    TODAYS_CHANGE_SELECTOR: 1,
    MONTHLY_CHANGE_SELECTOR: 2,
    QUARTERLY_CHANGE_SELECTOR: 3,
    SEMI_ANNUAL_CHANGE_SELECTOR: 4
},

URLS = [
    'http://services.runescape.com/m=itemdb_oldschool/Old+school+bond/viewitem?obj=13190',
    'http://services.runescape.com/m=itemdb_oldschool/Kodai+wand/viewitem?obj=21006',
    'https://secure.runescape.com/m=itemdb_oldschool/Ghrazi+rapier/viewitem?obj=22324'
]

module.exports = {
    PRICE_CONSTANTS,
    URLS
}
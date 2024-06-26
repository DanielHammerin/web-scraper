
const config = {
    /**
     * Price constants dictate which price change "category" to select from.
     */
    PRICE_CONSTANTS: {
        TODAYS_CHANGE_SELECTOR: 1,
        MONTHLY_CHANGE_SELECTOR: 2,
        QUARTERLY_CHANGE_SELECTOR: 3,
        SEMI_ANNUAL_CHANGE_SELECTOR: 4
    },

    /**
     * Urls of the items to scrape data from.
     */
    URLS: [
        "http://services.runescape.com/m=itemdb_oldschool/Old+school+bond/viewitem?obj=13190",
        "http://services.runescape.com/m=itemdb_oldschool/Kodai+wand/viewitem?obj=21006",
        "https://secure.runescape.com/m=itemdb_oldschool/Ghrazi+rapier/viewitem?obj=22324",
        "https://secure.runescape.com/m=itemdb_oldschool/Twisted+bow/viewitem?obj=20997",
        "https://secure.runescape.com/m=itemdb_oldschool/Scythe+of+vitur+%28uncharged%29/viewitem?obj=22486",
        "https://secure.runescape.com/m=itemdb_oldschool/Ancestral+hat/viewitem?obj=21018",
        "https://secure.runescape.com/m=itemdb_oldschool/Ancestral+robe+top/viewitem?obj=21021",
        "https://secure.runescape.com/m=itemdb_oldschool/Ancestral+robe+bottom/viewitem?obj=21024",
        "https://secure.runescape.com/m=itemdb_oldschool/Armadyl+helmet/viewitem?obj=11826",
        "https://secure.runescape.com/m=itemdb_oldschool/Armadyl+chestplate/viewitem?obj=11828",
        "https://secure.runescape.com/m=itemdb_oldschool/Armadyl+chainskirt/viewitem?obj=11830",
        "https://secure.runescape.com/m=itemdb_oldschool/Armadyl+crossbow/viewitem?obj=11785",
        "https://secure.runescape.com/m=itemdb_oldschool/Bandos+chestplate/viewitem?obj=11832",
        "https://secure.runescape.com/m=itemdb_oldschool/Bandos+tassets/viewitem?obj=11834",
        "https://secure.runescape.com/m=itemdb_oldschool/Saradomin+godsword/viewitem?obj=11806",
        "https://secure.runescape.com/m=itemdb_oldschool/Pegasian+boots/viewitem?obj=13237",
        "https://secure.runescape.com/m=itemdb_oldschool/Dragon+warhammer/viewitem?obj=13576",
        "https://secure.runescape.com/m=itemdb_oldschool/Osmumten%27s+fang/viewitem?obj=26219",
        "https://secure.runescape.com/m=itemdb_oldschool/Tumeken%27s+shadow+%28uncharged%29/viewitem?obj=27277",
        "https://secure.runescape.com/m=itemdb_oldschool/Zaryte+crossbow/viewitem?obj=26374",
        "https://secure.runescape.com/m=itemdb_oldschool/Sanguinesti+staff+%28uncharged%29/viewitem?obj=22481",
        "https://secure.runescape.com/m=itemdb_oldschool/Dragon+claws/viewitem?obj=13652",
    ],

    ITEM_COLLECTION_PATH: "./data/collection"
}

export default config;

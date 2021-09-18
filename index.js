var cheerio = require("./src/cheerio.js");
var puppeteer = require("./src/puppeteer.js");

puppeteer.scrape().then((value) => {
    console.log(value)
})

cheerio.scrapeNews().then((value) => {
    console.log(value)
})

cheerio.scrape().then((value) => {
    console.log(value)
})

// From https://medium.com/@fabiojanio/node-js-web-scraping-com-puppeteer-29dd974eb042

const puppeteer = require('puppeteer')
let scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://books.toscrape.com/')
  
  const result = await page.evaluate(() => {
    const books = []
    document.querySelectorAll('section > div > ol > li img')
            .forEach(book => books.push(book.getAttribute('alt')))
    return books
  })
  
  browser.close()
  return result
};
scrape().then((value) => {
    console.log(value)
})
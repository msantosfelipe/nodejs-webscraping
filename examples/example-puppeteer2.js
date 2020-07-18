// From https://medium.com/@fabiojanio/node-js-web-scraping-com-puppeteer-29dd974eb042

const puppeteer = require('puppeteer')

let scrape = async () => {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto('http://books.toscrape.com/')
    
    page.click("h3 > a")
    await page.waitForNavigation()
    await page.screenshot({ path: 'exemplo3.png' })
    
    const result = await page.evaluate(() => {
        const books = {}
        document.querySelectorAll('div.product_main')
            .forEach(book => {
                books.title = book.getElementsByTagName('h1')[0].innerText;
                books.price = book.getElementsByClassName('price_color')[0].innerText;
            })
        return books
    })

    browser.close()
    return result
};
scrape().then((value) => {
    console.log(value)
})
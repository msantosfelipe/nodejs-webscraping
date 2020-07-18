const puppeteer = require('puppeteer')

const url = 'https://www.ecbahia.com/'

let now = (unit) => {
    const hrTime = process.hrtime();
    switch (unit) {
        case 'milli':
            return hrTime[0] * 1000 + hrTime[1] / 1000000;
        case 'micro':
            return hrTime[0] * 1000000 + hrTime[1] / 1000;
        case 'nano':
            return hrTime[0] * 1000000000 + hrTime[1];
        default:
            return now('nano');
    }
};

let scrape = async () => {
    const start = now('milli')
    
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(url)

    const result = await page.evaluate(() => {
        const result = {}
        let nextMatch = {}
        let lastMatch = {}

        const tag = document.querySelectorAll('.area_proximo_jogo')[0]

        nextMatch.teamA = tag.querySelectorAll('.proximo .escudo_a img')[0].getAttribute('alt')
        nextMatch.teamB = tag.querySelectorAll('.proximo .escudo_b img')[0].getAttribute('alt')
        nextMatch.league = tag.querySelectorAll('.proximo .infos a span')[0].innerText
        nextMatch.matchDay = tag.querySelectorAll('.proximo .infos p')[0].innerText
        result.nextMatch = nextMatch

        lastMatch.teamA = tag.querySelectorAll('.ultimos .escudo_a img')[0].getAttribute('alt')
        lastMatch.teamAGoals = tag.querySelectorAll('.ultimos .escudo_a span')[0].innerText
        lastMatch.teamB = tag.querySelectorAll('.ultimos .escudo_b img')[0].getAttribute('alt')
        lastMatch.teamBGoals = tag.querySelectorAll('.ultimos .escudo_b span')[0].innerText
        lastMatch.league = tag.querySelectorAll('.ultimos .infos a span')[0].innerText
        lastMatch.matchDay = tag.querySelectorAll('.ultimos .infos p')[0].innerText
        result.lastMatch = lastMatch

        return result
    })
    
    browser.close()
    const end = now('milli')
    console.log('Puppeteer execution time: ' + (end - start) + ' milliseconds')

    return result
};

module.exports = {
    scrape
}

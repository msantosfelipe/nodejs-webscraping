const cheerio = require('cheerio');
const got = require('got');

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

    const response = await got(url);
    const $ = cheerio.load(response.body);

    const result = {}
    let nextMatch = {}
    let lastMatch = {}

    // next match
    nextMatch.teamA = $('.area_proximo_jogo .proximo .escudo_a img').prop('alt')
    nextMatch.teamB = $('.area_proximo_jogo .proximo .escudo_b img').prop('alt')
    nextMatch.league = $('.area_proximo_jogo .proximo .infos a span').text()
    nextMatch.matchDay = $('.area_proximo_jogo .proximo .infos p').text()
    result.nextMatch = nextMatch

    // last match
    lastMatch.teamA = $('.area_proximo_jogo .ultimos .escudo_a img').prop('alt')
    lastMatch.teamB = $('.area_proximo_jogo .ultimos .escudo_b img').prop('alt')
    $('.area_proximo_jogo .ultimos .escudo_a span').each(function(index, value){
        if (index === 0) {
            lastMatch.teamAGoals = $(this).text()
        }
    });
    $('.area_proximo_jogo .ultimos .escudo_b span').each(function(index, value){
        if (index === 0) {
            lastMatch.teamBGoals = $(this).text()
        }
    });
    $('.area_proximo_jogo .ultimos .infos a span').each(function(index, value){
        if (index === 0) {
            lastMatch.league = $(this).text()
        }
    });
    $('.area_proximo_jogo .ultimos .infos p').each(function(index, value){
        if (index === 0) {
            lastMatch.matchDay = $(this).text()
        }
    });
    result.lastMatch = lastMatch

    const end = now('milli')
    console.log('Cheerio execution time: ' + (end - start) + ' milliseconds')

    return result
};

module.exports = {
    scrape
}

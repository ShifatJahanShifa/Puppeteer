const puppeteer = require('puppeteer');
const request = require('request');
global.MSInputMethodContext = {};
const cheerio = require('cheerio');
// const { URL } = require('url'); 
// const { index } = require('cheerio/lib/api/traversing');

async function getHTMLSourceCode(url) {
    const browser = await puppeteer.launch();
    const newPage = await browser.newPage();
    await newPage.goto(url);
    const html = await newPage.content();
    await browser.close();
    return html;
}


// the url
const url = 'https://www.shafaetsplanet.com';
// htmlSourceCode = null;
(async () => {
    const htmlSourceCode = await getHTMLSourceCode(url);
    //console.log(htmlSourceCode);
    const $ = cheerio.load(htmlSourceCode);

    //extract external css link
    const externalCSSLinks = [];

    $('link[rel="stylesheet"]').each((index, element) => {
        externalCSSLinks.push($(element).attr('href'));
    });

    console.log(externalCSSLinks);

})();



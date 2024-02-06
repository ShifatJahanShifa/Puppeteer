const puppeteer = require('puppeteer');
const request = require('request');
global.MSInputMethodContext = {};
const cheerio = require('cheerio');
const axios=require('axios');
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

async function fetchCSS(url)
{
    try{
        const response=await axios.get(url);
        return response.data;
    }
    catch(error){
        console.log("ERROR FETCHING CSS");
        return null;
    }
}

// the url
const url = 'https://www.shafaetsplanet.com';
// htmlSourceCode = null;
(async () => {
    const htmlSourceCode = await getHTMLSourceCode(url);
    //console.log(htmlSourceCode);
    const $ = cheerio.load(htmlSourceCode);

    //extract css link
    const externalCSSLinks = [];

    $('link[rel="stylesheet"]').each((index, element) => {
        externalCSSLinks.push($(element).attr('href'));
    });

    console.log(externalCSSLinks); 

    //inline css
    const inlineCSS=[];
    $('style').each((index,element)=>{
        inlineCSS.push($(element).text());
    }); 

    //console.log(inlineCSS);

    for(let i=0;i<externalCSSLinks.length;i++){
    const externalCSSContent=await fetchCSS(externalCSSLinks[0]);
    console.log("extrenal css= "+externalCSSContent);
    }
})();



const puppeteer=require('puppeteer');

(async()=>{
    const browser=await puppeteer.launch({
        headless: true
    });
    const page=await browser.newPage();
    await page.goto('https://example.com');
    await page.screenshot({
        path: 'example.jpg'
    })
    await browser.close();
})();
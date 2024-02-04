const fs=require('fs');
const puppeteer=require('puppeteer');

(async()=>{
    const browser=await puppeteer.launch();
    const webPage=await browser.newPage();
    await webPage.goto("http://traversymedia.com");

    //await webPage.screenshot({path: "day2.png", fullPage: true});
    // await webPage.pdf({path: "day2.pdf", format: "A4"}); 

    // const html=await webPage.content();
    // console.log(html);

    // const title=await webPage.evaluate(()=> document.title);
    // console.log(title); 

    // const text=await webPage.evaluate(()=> document.body.innerText);
    // console.log(text); 

    // const link=await webPage.evaluate(()=> Array.from(document.querySelectorAll('a'),(e)=>e.href));
    // console.log(link); 

    const courses=await webPage.evaluate(()=>
    Array.from(document.querySelectorAll('#cscourses .container .cscourse-grid .card'),(e)=>({
        title: e.querySelector('.card-body h3').innerText,
        level: e.querySelector('.card-body .level').innerText,
        url: e.querySelector('.card-footer a').href
    })));

    
    //console.log(courses);
    fs.writeFile('output.json', JSON.stringify(courses), (err)=>{
        if(err) throw err;
        console.log("file saved");
    });

    await browser.close();
})();
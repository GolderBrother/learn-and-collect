let puppeteer = require('puppeteer');
let url = 'https://juejin.im/tag/%E5%89%8D%E7%AB%AF';
(async function(){
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(url,{waitUntil:'networkidle2'});
    //获取指定节点的属性 $ document.querySelector()  $$ document.querySelectorAll('a.title')
    const titles = await page.$$eval('a.title',elements => {
        return elements.map(item=>item.innerText);
    });
    console.log(titles);
    browser.close();
})();
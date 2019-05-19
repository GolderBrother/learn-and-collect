let puppeteer = require('puppeteer');
(async ()=>{
    const browser = await puppeteer.launch();  //1.打开一个无界面浏览器
    const page = await browser.newPage();     //2.打开一个空白页
    await page.goto('http://www.baidu.com');   //3.在地址栏中输入百度的地址
    await page.screenshot({path:'baidu.png'});//  4. 把当前的页面进行截图,保存到baidu.png文件里
    await browser.close();//关闭浏览器
})();
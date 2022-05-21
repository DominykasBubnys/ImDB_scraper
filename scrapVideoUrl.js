const puppeteer = require('puppeteer');

module.exports = getVideoUrl = async (videoPageUrl) => {
    
    if(videoPageUrl){
        const browser = await puppeteer.launch({
            dumpio: true
        });
        const page = await browser.newPage();
        browser.createIncognitoBrowserContext();
    
        await page.goto(`https://www.imdb.com${videoPageUrl}`, { waitUntil: 'networkidle2' });
    
        getPureUrl = await page.evaluate(() => {

            const videoURL = document.querySelector('.jw-video').src;

            return "videoURL";
        });

    
        await browser.close();  
    
        return getPureUrl;
    }
    else return null;
    
};
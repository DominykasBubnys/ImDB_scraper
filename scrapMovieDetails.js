const puppeteer = require('puppeteer');
const getPureVideoUrl = require("./scrapVideoUrl");

module.exports = ScrapMovieDetails = async(link, movieCategory) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    browser.createIncognitoBrowserContext();

    await page.goto(`https://www.imdb.com${link}`, { waitUntil: 'networkidle2' });
    
    // 

    movieDetails = await page.evaluate((category) => {

      const title = document.querySelector(".sc-b73cd867-0.eKrKux");
      const genres = Array.from(document.querySelectorAll('[data-testid="genres"]>a'))
      const storyLine = document.querySelector('[data-testid="plot-xs_to_m"]')
      const rate = document.querySelector(".sc-7ab21ed2-1.jGRxWM");
      const coverImgURL = document.querySelector(".ipc-image");
      const videoUrl = document.querySelector('[aria-label="Watch {VideoTitle}"]');

      return {
        title: title ? title.innerText : null,
        genres: genres ? genres.map(item => item.innerText) : null,
        storyLine: storyLine ? storyLine.innerText : null,
        rate: rate ? rate.innerText : null,
        category: category ? category : "no category",
        coverImgURL: coverImgURL ? coverImgURL.getAttribute("src") : null,
        videoURL: videoUrl ? videoUrl.getAttribute("href") : null
      }
    }, movieCategory);
  
    await browser.close();

    movieDetails.videoURL = await getPureVideoUrl(movieDetails.videoURL);
  
    return movieDetails
}


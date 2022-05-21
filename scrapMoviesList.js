const puppeteer = require('puppeteer');
const ScrapMovieDetails = require("./scrapMovieDetails");
const pushToDB = require("./pushToDB");


module.exports = ScrapMoviesList = async (url, category) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  browser.createIncognitoBrowserContext();

  await page.goto(url, { waitUntil: 'networkidle2' });
  
  const moviesList = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".lister-list .titleColumn a")).map(movie => movie.getAttribute("href"))
  });


  for(let i = 0; i < 20; i++){
    const movieDetails = await ScrapMovieDetails(moviesList[i], category);
    pushToDB(movieDetails, i);
  }

  await browser.close();

};
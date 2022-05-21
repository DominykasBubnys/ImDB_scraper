const scrapMoviesList = require("./scrapMoviesList");

(async () => {

  const mostPopularMoviesURL = "https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm";
  const topRatedMoviesURL = "https://www.imdb.com/chart/top/?ref_=nv_mv_250";

  try {

    await scrapMoviesList(mostPopularMoviesURL, "most popular");

    await scrapMoviesList(topRatedMoviesURL, "top rated");

  } catch (err) {
    console.log("Failed to scrap movies list: ", err);
  }

})();

const axios = require('axios');

function getMovie(movie) {
	const queryPromise = axios({
        url: `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.TMDB_KEY}`,
        method: 'GET'
    });

    return queryPromise;
}	

function searchMovie(query) {
	const queryPromise = axios({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${query}`,
        method: 'GET'
    })

    console.log(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${query}`);

    return queryPromise;
}	

module.exports = { getMovie, searchMovie };
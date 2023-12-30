import React, { useState } from 'react';
import "./App.css"
const App = () => {
  const [movie, setMovie] = useState({
    title: '',
    poster: 'https://i2.wp.com/www.newsbugz.com/wp-content/uploads/2021/05/jr-ntr-RRR-movie-scaled.jpg?resize=1075%2C1536&ssl=1',
    releasedDate: 'Date',
    rating: 'Rating',
    popularity: 'Popularity',
    description: 'Description',
    backdrop: 'https://www.realitypapers.co/wp-content/uploads/2022/03/RRR-Movie-Cast.jpeg'
  });

  const apiKey = 'c68c9df02f5ce01ace3886eb05160840';

  const search = async (event) => {
    if (event.key === 'Enter') {
      const value = event.target.value;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}&page=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          setMovie({
            title: result.original_title,
            poster: `https://image.tmdb.org/t/p/original${result.poster_path}`,
            releasedDate: result.release_date,
            rating: `${result.vote_average}/10`,
            popularity: result.popularity,
            description: result.overview,
            backdrop: `https://image.tmdb.org/t/p/original${result.backdrop_path}`
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const random = async () => {
    try {
      const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${randomLetter}&page=1`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const randomResult = data.results[Math.floor(Math.random() * data.results.length)];
        setMovie({
          title: randomResult.original_title,
          poster: `https://image.tmdb.org/t/p/original${randomResult.poster_path}`,
          releasedDate: randomResult.release_date,
          rating: `${randomResult.vote_average}/10`,
          popularity: randomResult.popularity,
          description: randomResult.overview,
          backdrop: `https://image.tmdb.org/t/p/original${randomResult.backdrop_path}`
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='container py-3 text-center'>
      <h1 className='text-center text-success fs-1'>Movie App</h1>

      <input id='inputSearch' type='text' onKeyUp={search} />
      <br />
      <button onClick={random} className='btn btn-primary my-2'>Search</button>
      <button onClick={random} className='btn btn-danger my-2'>Random</button>

      <h2 id='movieTitle'>{movie.title}</h2>
      <img id='poster' className='img-fluid my-2' src={movie.poster} alt='MovieImage' />

      <div className='row'>
        <div className='col text-center border'>
          <h5>Released On</h5>
          <p id='releasedDate'>{movie.releasedDate}</p>
        </div>
        <div className='col text-center border'>
          <h5>Imdb rating</h5>
          <p id='rating'>{movie.rating}</p>
        </div>
        <div className='col text-center border'>
          <h5>Popularity</h5>
          <p id='popularity'>{movie.popularity}</p>
        </div>
      </div>

      <p id='description' className='text-start p-4'>{movie.description}</p>
      <img id='poster2' className='img-fluid my-2' src={movie.backdrop} alt='MovieImage' />
    </div>
  );
};

export default App;

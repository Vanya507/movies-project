
import dayjs from 'dayjs';

export function createMovieElements(movie) {
  
  const movieElements = document.createElement("li");
  const movieTitle = document.createElement("h3");
  const movieRelease = document.createElement("h4");
  const movieImg = document.createElement("img");
  const movieLink = document.createElement("a");
  const movieLinkTwo = document.createElement("a");
  movieLink.append(movieImg);
  movieLinkTwo.append(movieTitle);
  movieLink.href = `../dist/assets/detail.html?id=${movie.id}`
  movieLinkTwo.href = `../dist/assets/detail.html?id=${movie.id}`

 
  
  movieTitle.textContent = movie.title; 
  movieRelease.textContent = dayjs(movie.release_date).format("MMM DD, YYYY");
  movieImg.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`;
  
  movieElements.append(movieLink, movieLinkTwo, movieRelease);
  return movieElements;
}
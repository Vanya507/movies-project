import dayjs from "dayjs";
import "../styles/reset.css";

import { options } from "../src/api";

const contanier = document.createElement("section");
document.body.append(contanier);
const searchedMoviesList = document.createElement("ul");

export const searchMovie = async (query) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
      options
    );
    const data = await response.json();
    console.log(data);
    
    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

export function showSearchedMovies(movie) {
  const movieElements = document.createElement("li");
  const movieTitle = document.createElement("h3");
  const movieRelease = document.createElement("h4");
  const movieImg = document.createElement("img");
  const movieDesc = document.createElement("p");
  const movieLink = document.createElement("a");
  const movieLinkTwo = document.createElement("a");
  movieLink.append(movieImg);
  movieLinkTwo.append(movieTitle);
  movieLink.href = `../detail/detail.html?id=${movie.id}`;
  movieLinkTwo.href = `../detail/detail.html?id=${movie.id}`;

  movieTitle.textContent = movie.title;
  movieDesc.textContent = movie.overview;
  
  movieRelease.textContent = dayjs(movie.release_date).format("MMM DD, YYYY");
  // movieImg.src = `https://media.themoviedb.org/t/p/w94_and_h141_face${movie.poster_path}`;
  movieImg.src = movie.poster_path 
  ? `https://media.themoviedb.org/t/p/w94_and_h141_face${movie.poster_path}`
  : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fimage-not-found&psig=AOvVaw3cSdQM1-8_qgkSd_10Dlch&ust=1725102105029000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIiWzqPInIgDFQAAAAAdAAAAABAE';

  movieElements.append(movieLink, movieLinkTwo, movieRelease, movieDesc);
  return movieElements;
}

const handleSearch = async () => {
  const query = localStorage.getItem("searchQuery");
  if (query) {
    const data = await searchMovie(query);
    if (data.results.length > 0) {
      data.results.forEach((movie) => {
        searchedMoviesList.append(showSearchedMovies(movie));
      });
      contanier.append(searchedMoviesList);
    } else {
      contanier.textContent = "No movies found.";
    }
  } else {
    contanier.textContent = "There are no movies that matched your query.";
  }
};

handleSearch();

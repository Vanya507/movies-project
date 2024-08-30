import dayjs from "dayjs";
import axios from "axios";
import "../styles/reset.css";

import { options } from "../src/api";

const contanier = document.createElement("section");
document.body.append(contanier);
const searchedMoviesList = document.createElement("ul");

const searchParams = new URLSearchParams(location.search);

console.log(searchParams.get("query"));

const url = `https://api.themoviedb.org/3/search/movie/${searchParams.get(
  "query"
)}?language=en-US`;

export async function searchMovie() {
  try {
    const res = await axios.get(url, options);
    console.log(res);
  } catch (e) {
    console.log("Error fetching movie:", e);
  }
}

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
    : "/notFound.jpg";

  movieElements.append(movieLink, movieLinkTwo, movieRelease, movieDesc);
  return movieElements;
}

const handleSearch = async (movie) => {
    if (movie.data.results.length > 0) {
      movie.data.results.forEach((movie) => {
        searchedMoviesList.append(showSearchedMovies(movie));
      });
      contanier.append(searchedMoviesList);
    } else {
      contanier.textContent = "No movies found.";
    }
};

handleSearch();

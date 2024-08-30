import dayjs from "dayjs";
import "../styles/reset.css";
import axios from "axios";
import { options } from "../src/api";

const container = document.createElement("section");
document.body.append(container);
const searchedMoviesList = document.createElement("ul");

const searchParams = new URLSearchParams(location.search);
const query = searchParams.get("search");

export const searchMovie = async (query) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

export function showSearchedMovies(movie) {
  const movieElement = document.createElement("li");
  const movieTitle = document.createElement("h3");
  const movieRelease = document.createElement("h4");
  const movieImg = document.createElement("img");
  movieImg.classList.add("movieImg");
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

  if(movie.poster_path) {
    movieImg.src = `https://media.themoviedb.org/t/p/w94_and_h141_face${movie.poster_path}`
  } else if (import.meta.env.MODE === "development") {
    movieImg.src = '/notFound.jpg'
  } else {
    movieImg.src = '/movies-project/notFound.jpg';
  }

  movieElement.append(movieLink, movieLinkTwo, movieRelease, movieDesc);
  return movieElement;
}

const handleSearch = async () => {
  if (query) {
    const movies = await searchMovie(query);
    if (movies.results.length > 0) {
      movies.results.forEach((movie) => {
        searchedMoviesList.append(showSearchedMovies(movie));
      });
      container.append(searchedMoviesList);
    } else {
      container.textContent = "No movies found.";
    }
  } else {
    container.textContent = "There are no movies that matched your query.";
  }
};

handleSearch();

import dayjs from "dayjs";
import "./reset.css";

// import { searchedMoviesList, search, getSearch } from "./src/createMovieElements";
import { options } from "./src/api";

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
  movieLink.href = `./detail.html?id=${movie.id}`;
  movieLinkTwo.href = `./detail.html?id=${movie.id}`;

  movieTitle.textContent = movie.title;
  movieDesc.textContent = movie.overview;
  
  movieRelease.textContent = dayjs(movie.release_date).format("MMM DD, YYYY");
  movieImg.src = `https://media.themoviedb.org/t/p/w94_and_h141_face${movie.poster_path}`;

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
      document.body.append(searchedMoviesList);
    } else {
      document.body.textContent = "No movies found.";
    }
  } else {
    document.body.textContent = "There are no movies that matched your query.";
  }
};

handleSearch();

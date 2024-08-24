import { searchedMoviesList, search, getSearch } from "./domElements";
import { createMovieElements } from "./createMovieElements";
import { options } from "./api";

export const searchMovie = async (query) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

const handleSearch = () => {
  const query = search.value;
  searchedMoviesList.innerHTML = "";

  searchMovie(query).then((data) => {
    data.results.forEach((movie) => {
      searchedMoviesList.append(createMovieElements(movie));
    });
    document.body.append(searchedMoviesList);
    search.value = "";
  });
};

getSearch.addEventListener("click", (e) => {
  handleSearch();
});

search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSearch();
  }
});

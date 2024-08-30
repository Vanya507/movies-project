import { search, getSearch } from "./domElements";
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
  const query = search.value.trim();
  search.value = "";
  localStorage.setItem("searchQuery", query); 
};

getSearch.addEventListener("click", (e) => {
  handleSearch();
  window.location.href = "searchedMovies/searchedMovies.html";
});

search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSearch();
    window.location.href = "searchedMovies/searchedMovies.html";
  }
});

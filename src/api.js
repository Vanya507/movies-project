import axios from "axios";
import { movieList, trendingMovies } from "./domElements";
import { createMovieElements } from "./createMovieElements";

export const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2I3MmUyNjRiZmRlMGVlMzkzNjY5NjQ4YzljYThhNSIsInN1YiI6IjVlZjQ5ZTIyYmNjZjFlMDAzNzM4NThmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ayZEv5_yIcHQ8MlpHvW6N54uBDoSz7XsnHGEHLUzack",
  },
};

export async function getMovies() {
  try {
    const res = await axios.get(url, options);
    console.log(res);
    
    res.data.results.forEach((movie) => {
      document.body.append(trendingMovies);
      movieList.append(createMovieElements(movie));
      
    });
    const sectionTitle = document.createElement("h2");
    sectionTitle.textContent = "Trending";
    trendingMovies.append(sectionTitle, movieList);
  } catch (error) {
    console.log("Error", error);
  }
}

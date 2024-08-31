import axios from "axios";
const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2I3MmUyNjRiZmRlMGVlMzkzNjY5NjQ4YzljYThhNSIsInN1YiI6IjVlZjQ5ZTIyYmNjZjFlMDAzNzM4NThmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ayZEv5_yIcHQ8MlpHvW6N54uBDoSz7XsnHGEHLUzack",
  },
};

const mainImg = document.querySelector(".search-movies");

async function getData() {
    try {
      const res = await axios.get(url, options);
      const randomMovieImg = res.data.results[Math.floor(Math.random() * res.data.results.length)];
      console.log(randomMovieImg);
      
      mainImg.style.backgroundImage = `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${randomMovieImg.backdrop_path})`;
    } catch (error) {
      console.log("Error", error);
    }
  }
  
getData();

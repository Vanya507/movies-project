import axios from "axios";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import "../styles/reset.css";


dayjs.extend(duration);

const searchParams = new URLSearchParams(location.search);

console.log(searchParams.get("id"));

const url = `https://api.themoviedb.org/3/movie/${searchParams.get(
  "id"
)}?language=en-US`;
const castUrl = `https://api.themoviedb.org/3/movie/${searchParams.get(
  "id"
)}/credits?language=en-US`;

const recUrl = `https://api.themoviedb.org/3/movie/${searchParams.get(
  "id"
)}/recommendations?language=en-US`;


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2I3MmUyNjRiZmRlMGVlMzkzNjY5NjQ4YzljYThhNSIsInN1YiI6IjVlZjQ5ZTIyYmNjZjFlMDAzNzM4NThmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ayZEv5_yIcHQ8MlpHvW6N54uBDoSz7XsnHGEHLUzack",
  },
};

async function getMovie() {
  try {
    const res = await axios.get(url, options);
    return res;
  } catch (e) {
    console.log("Error fetching movie:", e);
  }
}

async function getCast() {
  try {
    const res = await axios.get(castUrl, options);
    console.log(res);
    
    return res;
  } catch (e) {
    console.log("Error fetching cast:", e);
  }
}

async function getRec() {
  try {
    const res = await axios.get(recUrl, options);
    return res;
  } catch (e) {
    console.log("Error fetching recommendations:", e);
  }
}

function showMovie(movie) {
  const movieContainer = document.createElement("section");
  movieContainer.classList.add("container");
  document.body.append(movieContainer);

  const movieTitle = document.createElement("h2");
  const movieRelease = document.createElement("h4");
  const movieImg = document.createElement("img");
  const runTime = document.createElement("h4");

  movieContainer.style.backgroundImage = movie.data.backdrop_path
  ? `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.data.backdrop_path})`
  : './notFound.jpg';
  movieContainer.classList.add("bgTitle");
  movieTitle.textContent = movie.data.title;
  document.title = movie.data.title;

  runTime.textContent = dayjs
    .duration(movie.data.runtime, "minutes")
    .format("H[h] mm[m]");

  movieRelease.textContent = dayjs(movie.data.release_date).format(
    "MM/DD/YYYY"
  );
  movieImg.src = movie.data.poster_path
  ? `https://media.themoviedb.org/t/p/w300_and_h450_face${movie.data.poster_path}`
  : './notFound.jpg';

  movieContainer.append(movieImg, movieTitle, runTime, movieRelease);
  return movieContainer;
}

function showCact(cast) {
  const castContainer = document.createElement("section");
  castContainer.classList.add("cast-container");
  document.body.append(castContainer);

  const castTitle = document.createElement("h2");
  castTitle.classList.add("castTitle");
  castTitle.textContent = "Top Billed Cast";

  const actorsList = document.createElement("ul");
  castContainer.append(castTitle, actorsList);

  let count = 0;
  cast.data.cast.forEach((element) => {
    if (count < 9) {
      const actorImg = document.createElement("img");
      const actorInfo = document.createElement("li");
      const actorName = document.createElement("h3");
      const character = document.createElement("h5");
      const actorLink = document.createElement("a");

      actorLink.append(actorImg);
      actorLink.href = `../actorInfo/actorInfo.html?id=${element.id}`;

      actorsList.append(actorInfo);
      actorInfo.append(actorLink, actorName, character);
      actorImg.src = element.profile_path
      ? `https://media.themoviedb.org/t/p/w138_and_h175_face/${element.profile_path}`
      : '/notFound.jpg';
      actorName.textContent = element.name;
      character.textContent = element.character;

      count++;
    }
  });
}

function showRec(rec) {
  const recMovieContainer = document.createElement("section");
  recMovieContainer.classList.add("rec-container");
  document.body.append(recMovieContainer);

  const recTitle = document.createElement("h2");
  recTitle.classList.add("recTitle");
  recTitle.textContent = "Recommendations";

  const recList = document.createElement("ul");
  recMovieContainer.append(recTitle, recList);

  rec.data.results.forEach((element) => {

    const recInfo = document.createElement("li");
  
    const recImg = document.createElement("img");
    const recTitle = document.createElement("h3");
    const recLink = document.createElement("a");
    recLink.append(recImg);
    recLink.href = `./detail.html?id=${element.id}`;
  
    console.log(import.meta.env.MODE === "development");
    
    recImg.src = element.backdrop_path
    ? `https://media.themoviedb.org/t/p/w250_and_h141_face${element.backdrop_path}`
    : './notFound.jpg';
    recTitle.textContent = element.title;
  
    recInfo.append(recLink, recTitle);
    recList.append(recInfo);
  });

}

Promise.all([getMovie(), getCast(), getRec()])
  .then(([movieResponse, castResponse, recResponse]) => {
    showMovie(movieResponse);

    showCact(castResponse);

    showRec(recResponse);
    
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

import axios from "axios";
import "../styles/reset.css";


const searchParam = new URLSearchParams(location.search);

console.log(searchParam.get("id"));

const actorInfoUrl = `https://api.themoviedb.org/3/person/${searchParam.get(
  "id"
)}?language=en-US`;

const movieCreditsInfoUrl = `https://api.themoviedb.org/3/person/${searchParam.get(
  "id"
)}/movie_credits?language=en-US`

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2I3MmUyNjRiZmRlMGVlMzkzNjY5NjQ4YzljYThhNSIsInN1YiI6IjVlZjQ5ZTIyYmNjZjFlMDAzNzM4NThmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ayZEv5_yIcHQ8MlpHvW6N54uBDoSz7XsnHGEHLUzack",
  },
};

async function getCastInfo() {
  try {
    const res = await axios.get(actorInfoUrl, options);
    console.log(res);
    return res;
  } catch (e) {
    console.log("Error fetching movie:", e);
  }
}

async function getMovieCreditstInfo() {
  try {
    const res = await axios.get(movieCreditsInfoUrl, options);
    console.log(res);
    return res;
  } catch (e) {
    console.log("Error fetching movie:", e);
  }
}


const container = document.createElement("section");
container.classList.add("actor-container");
document.body.append(container);

function showActorInfo(actor) {
  
  const actorImg = document.createElement("img");
  actorImg.src = actor.data.profile_path
  ? `https://media.themoviedb.org/t/p/w300_and_h450_face${actor.data.profile_path}`
  : "notFound.jpg";
  
  const actorName = document.createElement("h2");
  actorName.textContent = actor.data.name;
  document.title = actor.data.name;
  
  const actorBiography = document.createElement("p");
  actorBiography.textContent = actor.data.biography;  ;
  container.append(actorImg, actorName, actorBiography);
}

function showMovieCredits(credits) {
  const moviesList = document.createElement("ul");
  container.append(moviesList);
  
  let count = 0;
  credits.data.cast.forEach((element) => {
    if (count < 9) {
      const movieInfo = document.createElement("li");
      const movieImg = document.createElement("img");
      const movieName = document.createElement("h4");
      const movieLink = document.createElement("a");

      movieLink.append(movieImg);
      movieLink.href = `../detail/detail.html?id=${element.id}`;

      moviesList.append(movieInfo);
      movieInfo.append(movieLink, movieName);
      movieImg.src = element.poster_path
      ? `https://media.themoviedb.org/t/p/w130_and_h195_face/${element.poster_path}`
      : "notFound.jpg";
      movieName.textContent = element.original_title;

      count++;
    }
  });
}
  

Promise.all([getCastInfo(), getMovieCreditstInfo()])
  .then(([castInfoResponse, movieCreditsResponse]) => {
    showActorInfo(castInfoResponse);

    showMovieCredits(movieCreditsResponse);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

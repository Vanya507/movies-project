import "./reset.css";
import "./style.css";
import "./src/api";
import "./src/searchMovies";
import './src/createMovieElements'
import './detail'
import './actorInfo'
import { getMovies } from "./src/api";

getMovies();

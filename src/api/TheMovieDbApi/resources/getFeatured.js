import { ApiConstructor, ApiResponseHandler } from "../constructor";

// https://developers.themoviedb.org/3/movies/get-now-playing
const getFeatured = () =>
  ApiResponseHandler({ instance: ApiConstructor.get("now_playing") });

export default getFeatured;

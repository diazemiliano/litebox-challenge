import { ApiConstructor, ApiResponseHandler } from "../constructor";

// https://developers.themoviedb.org/3/movies/get-popular-movies
const getPopular = () =>
  ApiResponseHandler({ instance: ApiConstructor.get("popular") });

export default getPopular;

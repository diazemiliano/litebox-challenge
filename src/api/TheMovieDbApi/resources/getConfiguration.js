import { ApiConstructor, ApiResponseHandler } from "../constructor";

// https://developers.themoviedb.org/3/movies/get-popular-movies
const getConfiguration = () =>
  ApiResponseHandler({ instance: ApiConstructor.get("configuration") });

export default getConfiguration;

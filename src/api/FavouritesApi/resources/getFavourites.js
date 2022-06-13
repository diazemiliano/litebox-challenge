import { ApiConstructor, ApiResponseHandler } from "../constructor";

const getFavourites = () =>
  ApiResponseHandler({ instance: ApiConstructor.get("favourites") });

export default getFavourites;

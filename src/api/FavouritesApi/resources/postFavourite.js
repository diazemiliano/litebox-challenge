import { ApiConstructor, ApiResponseHandler } from "../constructor";

const getFavourites = ({ favourite }) =>
  ApiResponseHandler({
    instance: ApiConstructor.post("favourites", { favourite }),
  });

export default getFavourites;

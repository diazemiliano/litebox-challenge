import { ApiConstructor, ApiResponseHandler } from "../constructor";

const { getDocs, collection, db } = ApiConstructor.store;
const getFavourites = () =>
  ApiResponseHandler({
    instance: getDocs(collection(db, "peliculas")),
  });

export default getFavourites;

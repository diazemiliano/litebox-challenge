import { ApiConstructor, ApiResponseHandler } from "../constructor";

const { addDoc, collection, db } = ApiConstructor.store;
const postFavourites = ({ title, poster }) =>
  ApiResponseHandler({
    instance: addDoc(collection(db, "peliculas"), {
      title,
      poster,
    }),
  });

export default postFavourites;

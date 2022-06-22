import { ApiConstructor, ApiResponseHandler } from "../constructor";

const { ref, firebaseStorage, uploadBytes } = ApiConstructor.storage;
const postPoster = ({ file }) => {
  const reference = ref(firebaseStorage, `posters/${file.name}`);
  return ApiResponseHandler({
    reference,
    instance: uploadBytes(reference, file),
  });
};
export default postPoster;

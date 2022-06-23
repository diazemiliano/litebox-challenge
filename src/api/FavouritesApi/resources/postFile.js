import { ApiConstructor, ApiResponseHandler } from "../constructor";

const { ref, firebaseStorage, uploadBytesResumable } = ApiConstructor.storage;
const postPoster = ({
  file,
  // eslint-disable-next-line no-unused-vars
  progressCb = (progress) => console.warn(`"progressCb" not defined`),
  // eslint-disable-next-line no-unused-vars
  errorCb = (error) => console.warn(`"errorCb" not defined`),
}) => {
  const reference = ref(firebaseStorage, `posters/${file.name}`);
  const upload = uploadBytesResumable(reference, file);

  upload.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      progressCb(progress);
    },
    (error) => errorCb(error)
  );

  return ApiResponseHandler({ instance: upload });
};
export default postPoster;

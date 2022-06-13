import axios from "axios";
const TMDB_API = process.env.VUE_APP_TMDB_API;

/**
 * Constructs the Axios Instance with the defaults
 * @type {AxiosInstance}
 */
const ApiConstructor = axios.create({
  baseURL: `${TMDB_API}/3/movie/`,
  params: {
    api_key: "6f26fd536dd6192ec8a57e94141f8b20",
    //api_key: "6f26fd536dd6192ec8a57e94141f8b2",
  },
});

/**
 * Handles Successful and Bad responses
 * @param {Promise} instance
 * @returns {Promise}
 */
const ApiResponseHandler = ({ instance }) =>
  instance
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      const hasFailedWithKnownErrors = [401, 404].includes(
        error.response.status
      );

      let errorMessage = error.message;

      if (hasFailedWithKnownErrors) {
        errorMessage = error.response.data?.status_message;
      }

      throw errorMessage;
    });

export { ApiConstructor, ApiResponseHandler };

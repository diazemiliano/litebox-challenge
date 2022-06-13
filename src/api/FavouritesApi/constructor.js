import axios from "axios";

const ApiConstructor = axios.create({
  baseURL: "https://",
  params: {
    api_key: "",
  },
});
const ApiResponseHandler = ({ instance }) => {
  return instance;
};

export { ApiConstructor, ApiResponseHandler };

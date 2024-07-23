import axios from "axios";
export const fetchData = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_QUIZ_API}`);
    // return the whole response object instead of only the data.
    // this helps in error handling in the component
    return response.data;
  } catch (error) {}
};

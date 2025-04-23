import axios from "axios";
import { API_URL } from "../components/API_EndPoint";

const GetResponse = async (prompt) => {
  try {
    const response = await axios.get(API_URL + `${prompt}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data.response;
  } catch (error) {
    console.error("There was an error!", error);
  }
};

export default GetResponse;

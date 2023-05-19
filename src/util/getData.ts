import axios from "axios";

export async function getData() {
  try {
    const response = await axios.get("https://random-data-api.com/api/v2/users");
    console.log(response);
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}

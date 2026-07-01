import axios from "axios";

export async function sendConnection({ reciever, sender }) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/connection/send/${reciever}`,
      {
        withCredentials: true,
      },
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response.status);
    console.log(error.response.data, { depth: null });
    throw error;
  }
}

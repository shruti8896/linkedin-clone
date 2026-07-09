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

export async function acceptConnection(connectionId) {
  try {
    console.log(connectionId);
    const response = await axios.get(
      `http://localhost:8080/api/connection/accept/${connectionId}`,
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

export async function rejectConnection(connectionId) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/connection/reject/${connectionId}`,
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

export async function pendingconnections(userId) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/connection/pendingconnections/${userId}`,
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

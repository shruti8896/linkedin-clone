import axios from "axios";

export const createPost = async (postData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/currentuser/post/createPost",
      postData,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.log("Error comming here");
    console.error("Error creating post:", error);
    throw error.response?.data || error.message;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/currentuser/post/getPosts",
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log("error in fetching all posts");
    throw error;
  }
};

import axios from "axios";

export const createPost = async (postData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/post/createPost",
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

export const getAllPosts = async (page = 1, limit = 10) => {
  try {
    console.log("sending requests");
    console.log(page);
    console.log(limit);
    const response = await axios.get(
      `http://localhost:8080/api/post/getPosts?page=${page}&limit=${limit}`,
      { withCredentials: true },
    );
    console.log("-----------------------------------------");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("error in fetching all posts");
    console.log(error.response.data);
    throw error;
  }
};

export const likePost = async (postId) => {
  try {
    console.log("likePost ran");
    const response = await axios.get(
      `http://localhost:8080/api/post/likePost/${postId}`,
      { withCredentials: true },
    );
    // console.log(response.data.message);
    console.log("response");
    return response.data.message;
  } catch (error) {
    console.log("error in liking the post");
    console.log(error.response.status);
    console.log(error.response.data, { depth: null });
    throw error;
  }
};
export const commentPost = async (postId, comment) => {
  console.log(postId);
  console.log(comment);
  try {
    console.log("request sent");
    const response = await axios.post(
      `http://localhost:8080/api/currentuser/post/commentPost/${postId}`,
      { comment },
      { withCredentials: true },
    );

    console.log(response);
    return response.data;
  } catch (error) {
    console.log("error in commenting on  the post");
    throw error;
  }
};

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllPosts } from "../services/postService";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [allPosts, setAllPosts] = useState(null);

  useEffect(() => {
    async function getAllPostsInfo() {
      try {
        console.log("getting all Posts info");
        const allPostsData = await getAllPosts();
        setAllPosts(allPostsData);
        console.log(allPostsData);
      } catch (error) {
        console.log("erorr in fetching all posts");
        console.log(error);
      }
    }

    getAllPostsInfo();
  }, []);

  return (
    <PostContext.Provider value={{ allPosts }}>{children}</PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);

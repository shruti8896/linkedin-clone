import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllPosts } from "../services/postService";
import { useUserContext } from "./UserContext";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [allPosts, setAllPosts] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);  // next pages
  const { currentUserData } = useUserContext();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  async function getAllPostsInfo() {
    try {
      if (loadingPosts || !hasMore) {
        return;
      }
      setLoadingPosts(true);
      setLoadingMore(true);
      // console.log("getting all Posts info...........");
      const allPostsData = await getAllPosts(page);
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(allPostsData);
      setAllPosts((prev) => {
        if (!prev) {
          return allPostsData;
        }
        return {
          ...prev,
          allPosts: [...prev.allPosts, ...allPostsData.allPosts],
        };
      });
      setHasMore(allPostsData.hasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log("erorr in fetching all posts");
      console.log(error);
    } finally {
      setLoadingPosts(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    getAllPostsInfo();
  }, [currentUserData]);

  return (
    <PostContext.Provider
      value={{
        allPosts,
        setAllPosts,
        loadingPosts,
        hasMore,
        page,
        getAllPostsInfo,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);

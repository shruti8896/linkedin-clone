import React, { useEffect, useRef, useState } from "react";
import UserProfile from "./UserProfile";
import { RxCross2 } from "react-icons/rx";
import profileImage from "../../assets/profile-picture.png";
import { GoPlusCircle } from "react-icons/go";
import navbarLogo from "../../assets/Navbarlogo.png";
import { AiOutlineLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import NavItem from "../NavItem";
import { usePostContext } from "../../contexts/posts.context";
import { useUserContext } from "../../contexts/UserContext";
import { commentPost, likePost } from "../../services/postService";
import ActionButton from "../ActionButton";
import { sendConnection } from "../../services/connectionService";
import { motion } from "framer-motion";
import PostSkeleton from "../PostSkeleton";

function Feed() {
  const {
    allPosts,
    loadingPosts,
    setAllPosts,
    hasMore,
    page,
    getAllPostsInfo,
    loadingMore,
  } = usePostContext();
  const { currentUserData } = useUserContext();
  const [activePostId, setActivePostId] = useState("");
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);

  const loaderRef = useRef();

  async function handleLike(postId) {
    console.log("handlelike ran");
    let response = await likePost(postId);
    console.log(response);
    console.log(currentUserData._id);
    let updatedPosts = allPosts.allPosts.map((post) => {
      // console.log(post);
      if (post._id == postId) {
        post = { ...post, likes: response.likes };
      }
      return post;
    });

    setAllPosts({ allPosts: updatedPosts });
    setLiked(!liked);
    console.log(updatedPosts);

    console.log("post liked");
  }

  async function handleComment(postId) {
    let response = await commentPost(postId, comment);
    console.log(response.post);
    const updatedPosts = allPosts.allPosts.map((post) =>
      post._id === postId
        ? { ...post, comments: response.post.comments }
        : post,
    );

    console.log(allPosts);
    console.log(updatedPosts);

    setAllPosts((prev) => ({
      ...prev,
      allPosts: updatedPosts,
    }));
    setComment("");
    console.log(response);
  }

  function getTimeAgo(createdAt) {
    const now = new Date();
    const created = new Date(createdAt);

    const diffInSeconds = Math.floor((now - created) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays}d`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths}mo`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}y`;
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loadingPosts) {
        getAllPostsInfo();
      }
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [hasMore, loadingPosts, getAllPostsInfo]);

  async function handleSendConnection(id) {
    try {
      const connectionResponse = await sendConnection({
        reciever: id,
        sender: currentUserData._id,
      });
      console.log(connectionResponse.sendConnectionResponse);
      console.log(connectionResponse.status);
    } catch (error) {
      console.log(error.status);
      if (error.status === 403) {
        // console.log("jhvbsdyvvbhwevbsjhvvsvsvsvavaev");
        console.log(error.response.data);
        alert(error.response.data);
      }
    }
  }

  if (loadingPosts || !allPosts) {
    return (
      <div className="flex-5 min-h-72 bg-white rounded-xl p-5 shadow-xl flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex-5 min-h-72  ">
      {/* {console.log(allPosts)} */}

      {allPosts?.allPosts?.map((post, index) => {
        const isLiked = post.likes.includes(currentUserData._id);
        return (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            key={index}
            className="bg-white rounded-lg p-2 shadow-md mb-2"
          >
            {/* {console.log(post)} */}
            <div key={index} className="flex gap-3 ">
              <div className="h-24 w-24 rounded-full mt-1 ">
                <img src={post.author.profilePic || profileImage} alt="" />
              </div>
              <div className="flex flex-col mt-1  ">
                <h1 className="md ">{post.author.username || "DummyName"}</h1>
                <p className="text-sm -mt-1">{post.author.headline || ""}</p>
                <p className="text-sm -mt-1">{getTimeAgo(post.createdAt)}</p>
              </div>
              {/* <button className="flex gap-1 mt-1 mx-2 cursor-pointer">
                <GoPlusCircle className="mt-1 text-blue-500" />
                <p className="text-blue-500">Follow</p>
              </button> */}

              <ActionButton
                icon={<GoPlusCircle className="mt-1 text-blue-500" />}
                label={"Follow"}
                className={`cursor-pointer text-blue-500 h-10 hover:bg-gray-100`}
                onClick={() => handleSendConnection(post.author._id)}
              />
            </div>

            <div key={post._id} className="flex flex-col gap-3">
              <p className="text-sm m-2 break-all">{post.description || " "}</p>
              {post.image && (
                <img src={post.image} alt="" className="h-80 w-80" />
              )}
              <div className=" ml-4 flex gap-3 ">
                <div className="flex">
                  {" "}
                  <AiOutlineLike size={15} color="blue" />
                  <p className=" text-xs mx-1">{post.likes.length}</p>
                </div>
                <div className="flex">
                  <FaCommentDots size={15} color="blue" />
                  <p className=" text-xs mx-1">{post.comments.length}</p>
                </div>
              </div>
              <hr />
              <div className="flex gap-2 justify-around my-1 mb-4">
                {" "}
                <ActionButton
                  icon={
                    <AiOutlineLike
                      size={20}
                      color={isLiked ? "blue" : "black"}
                    />
                  }
                  label={"Like"}
                  onClick={() => handleLike(post._id)}
                />
                <ActionButton
                  icon={<FaCommentDots size={20} />}
                  label={"Comment"}
                  onClick={() => setActivePostId(post._id)}
                />
                <ActionButton icon={<BiRepost size={20} />} label={"Repost"} />
                <ActionButton icon={<BsSendFill size={20} />} label={"Send"} />
              </div>

              {activePostId === post._id && (
                <div className="w-[98%] mx-auto mb-4 h-12 flex border-gray-600 border rounded-md  text-gray-800 ">
                  <input
                    type="text"
                    value={comment}
                    name="commentBox"
                    placeholder="Write your thoughts here.."
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full text-xs focus:outline-none text-gray-800  px-2  border-none placeholder:text-xs"
                  />
                  <button
                    type="button"
                    className="mr-3 font-semibold text-blue-500 "
                    onClick={() => handleComment(post._id)}
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}

      <div ref={loaderRef} className="flex flex-col items-center py-8">
        {/* <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-gray-300 border-t-blue-600"></div> */}
        <p className="mt-3 text-sm text-gray-500">
          You have reached to the end of the posts
        </p>
      </div>
    </div>
  );
}

export default Feed;

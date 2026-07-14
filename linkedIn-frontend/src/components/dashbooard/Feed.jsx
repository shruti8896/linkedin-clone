import React, { useEffect, useRef, useState } from "react";
import profileImage from "../../assets/profile-picture.png";
import { GoPlusCircle } from "react-icons/go";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import { usePostContext } from "../../contexts/posts.context";
import { useUserContext } from "../../contexts/UserContext";
import { commentPost, likePost } from "../../services/postService";
import { sendConnection } from "../../services/connectionService";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { getTimeAgo } from "../../utils/helperFunctions";
import { io } from "socket.io-client";

function Feed() {
  const {
    allPosts,
    loadingPosts,
    setAllPosts,
    hasMore,
    getAllPostsInfo,
  } = usePostContext();
  const { currentUserData } = useUserContext();
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState("");
  const [commentText, setCommentText] = useState("");
  const loaderRef = useRef();

  const socketRef = useRef(null);

  // Initialize socket
  useEffect(() => {
    socketRef.current = io("http://localhost:8080");

    socketRef.current.on("likeUpdated", ({ userPostId, likes }) => {
      setAllPosts((prev) => {
        if (!prev || !prev.allPosts) return prev;
        const updatedPosts = prev.allPosts.map((post) => {
          if (post._id === userPostId) {
            return { ...post, likes: likes };
          }
          return post;
        });
        return { ...prev, allPosts: updatedPosts };
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [setAllPosts]);

  // Infinite scroll
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

  // Handle Like Action
  async function handleLike(postId) {
    try {
      const response = await likePost(postId);
      setAllPosts((prev) => {
        if (!prev || !prev.allPosts) return prev;
        const updatedPosts = prev.allPosts.map((post) => {
          if (post._id === postId) {
            return { ...post, likes: response.likes };
          }
          return post;
        });
        return { ...prev, allPosts: updatedPosts };
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  // Handle Comment Submission
  async function handleCommentSubmit(e, postId) {
    e.preventDefault();
    if (!commentText.trim()) return;

    const currentText = commentText.trim();
    setCommentText(""); // clear early for responsive feel

    try {
      const response = await commentPost(postId, currentText);
      setAllPosts((prev) => {
        if (!prev || !prev.allPosts) return prev;
        const updatedPosts = prev.allPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: response.post.comments }
            : post
        );
        return { ...prev, allPosts: updatedPosts };
      });
      toast.success("Comment added");
    } catch (error) {
      console.error("Error adding comment:", error);
      setCommentText(currentText); // restore text on fail
      toast.error("Failed to add comment");
    }
  }

  // Send Connection Request
  async function handleSendConnection(targetUserId) {
    try {
      await sendConnection({
        reciever: targetUserId,
        sender: currentUserData._id,
      });
      toast.success("Connection request sent");
    } catch (error) {
      console.error("Error sending connection request:", error);
      const errMsg = error.response?.data || error.message || "Failed to send request";
      toast.error(errMsg);
    }
  }

  // Toggle comments expand section
  const toggleComments = (postId) => {
    if (expandedCommentsPostId === postId) {
      setExpandedCommentsPostId("");
    } else {
      setExpandedCommentsPostId(postId);
    }
  };

  if (!allPosts || (loadingPosts && (!allPosts.allPosts || allPosts.allPosts.length === 0))) {
    return (
      <div className="w-full bg-white rounded-xl border border-gray-200 p-8 flex justify-center items-center h-48">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {allPosts.allPosts?.length === 0 ? (
        <div className="w-full bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
          No posts available. Be the first to share something!
        </div>
      ) : (
        allPosts.allPosts.map((post) => {
          const isLiked = post.likes?.includes(currentUserData?._id);
          const author = post.author || {};
          const isOwnPost = author._id === currentUserData?._id;
          const isConnected = author.connections?.includes(currentUserData?._id);

          return (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              key={post._id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col"
            >
              {/* Post Header */}
              <div className="flex justify-between items-start w-full">
                <div className="flex gap-3">
                  <img
                    src={author.profilePic || profileImage}
                    alt={`${author.firstname || "User"}`}
                    className="h-11 w-11 rounded-full object-cover border border-gray-200 flex-shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-xs font-semibold text-gray-900 hover:underline cursor-pointer truncate">
                      {author.firstname} {author.lastname || ""}
                    </h3>
                    <p className="text-[10px] text-gray-500 line-clamp-1">
                      {author.headline || "LinkedIn Member"}
                    </p>
                    <p className="text-[9px] text-gray-400 mt-0.5">
                      {getTimeAgo(post.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Follow/Connect Button */}
                {!isOwnPost && !isConnected && (
                  <button
                    onClick={() => handleSendConnection(author._id)}
                    className="text-blue-600 hover:bg-blue-50 text-[11px] font-bold py-1.5 px-3 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <GoPlusCircle size={14} />
                    <span>Connect</span>
                  </button>
                )}
              </div>

              {/* Post Description */}
              <p className="text-[12.5px] text-gray-800 leading-relaxed mt-3 break-words whitespace-pre-line px-0.5">
                {post.description}
              </p>

              {/* Post Image */}
              {post.image && (
                <div className="mt-3 overflow-hidden rounded-lg border border-gray-100 max-h-[460px] bg-gray-50 flex items-center justify-center">
                  <img
                    src={post.image}
                    alt="Post attachment"
                    className="w-full h-full object-contain max-h-[460px]"
                  />
                </div>
              )}

              {/* Reactions Bar Info */}
              <div className="flex justify-between items-center py-2 px-1 text-[10.5px] text-gray-500 border-b border-gray-100 mt-3 w-full">
                <div className="flex items-center gap-1">
                  <span className="flex items-center justify-center bg-blue-500 text-white rounded-full w-3.5 h-3.5 text-[8px] font-bold">
                    👍
                  </span>
                  <span className="font-medium text-gray-600">
                    {post.likes?.length || 0}
                  </span>
                </div>
                <button 
                  onClick={() => toggleComments(post._id)}
                  className="hover:underline hover:text-blue-600 transition-colors font-medium text-gray-500 cursor-pointer"
                >
                  {post.comments?.length || 0} comments
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-1.5 w-full">
                {/* Like Button */}
                <button
                  onClick={() => handleLike(post._id)}
                  className={`flex-1 flex justify-center items-center gap-2 hover:bg-gray-100 py-2.5 rounded-lg transition-colors cursor-pointer ${
                    isLiked ? "text-blue-600 font-bold" : "text-gray-500 font-semibold"
                  }`}
                >
                  {isLiked ? (
                    <AiFillLike size={18} className="text-blue-600 scale-110 transition-transform" />
                  ) : (
                    <AiOutlineLike size={18} />
                  )}
                  <span className="text-[11.5px]">Like</span>
                </button>

                {/* Comment Button */}
                <button
                  onClick={() => toggleComments(post._id)}
                  className="flex-1 flex justify-center items-center gap-2 hover:bg-gray-100 py-2.5 rounded-lg text-gray-500 font-semibold transition-colors cursor-pointer"
                >
                  <FaCommentDots size={16} />
                  <span className="text-[11.5px]">Comment</span>
                </button>

                {/* Repost Button */}
                <button
                  className="flex-1 flex justify-center items-center gap-2 hover:bg-gray-100 py-2.5 rounded-lg text-gray-500 font-semibold transition-colors cursor-pointer"
                  onClick={() => toast.success("Feature coming soon!")}
                >
                  <BiRepost size={20} />
                  <span className="text-[11.5px]">Repost</span>
                </button>

                {/* Send Button */}
                <button
                  className="flex-1 flex justify-center items-center gap-2 hover:bg-gray-100 py-2.5 rounded-lg text-gray-500 font-semibold transition-colors cursor-pointer"
                  onClick={() => toast.success("Feature coming soon!")}
                >
                  <BsSendFill size={13} />
                  <span className="text-[11.5px]">Send</span>
                </button>
              </div>

              {/* Comments Section */}
              <AnimatePresence>
                {expandedCommentsPostId === post._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden w-full pt-4"
                  >
                    {/* Write Comment Box */}
                    <form
                      onSubmit={(e) => handleCommentSubmit(e, post._id)}
                      className="flex gap-2.5 items-center w-full"
                    >
                      <img
                        src={currentUserData?.profilePic || profileImage}
                        alt="My Profile"
                        className="h-8 w-8 rounded-full object-cover border border-gray-200 flex-shrink-0"
                      />
                      <div className="flex-1 flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800"
                        />
                        <button
                          type="submit"
                          disabled={!commentText.trim()}
                          className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer flex-shrink-0"
                        >
                          Post
                        </button>
                      </div>
                    </form>

                    {/* Comments List */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="mt-3.5 space-y-3 max-h-72 overflow-y-auto pr-1">
                        {post.comments.map((c, commentIdx) => {
                          const commenter = c.user || {};
                          return (
                            <div key={c._id || commentIdx} className="flex gap-2.5 items-start">
                              <img
                                src={commenter.profilePic || profileImage}
                                alt="Commenter avatar"
                                className="h-8 w-8 rounded-full object-cover border border-gray-100 flex-shrink-0 mt-0.5"
                              />
                              <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-[11px] leading-relaxed">
                                <div className="flex justify-between items-baseline mb-0.5">
                                  <span className="font-semibold text-gray-900 hover:underline cursor-pointer">
                                    {commenter.firstname || "LinkedIn Member"} {commenter.lastname || ""}
                                  </span>
                                </div>
                                <span className="text-[9.5px] text-gray-400 block -mt-0.5 truncate max-w-[200px]">
                                  {commenter.headline || "LinkedIn Member"}
                                </span>
                                <p className="text-gray-800 text-[11px] mt-1.5 break-words">
                                  {c.comment}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })
      )}

      {/* Infinite Scroll Sentinel */}
      <div ref={loaderRef} className="flex flex-col items-center py-6 w-full">
        {loadingPosts && (
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        )}
        {!hasMore && allPosts.allPosts?.length > 0 && (
          <p className="text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">
            No more posts to load
          </p>
        )}
      </div>
    </div>
  );
}

export default Feed;

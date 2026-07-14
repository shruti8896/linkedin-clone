import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useUserContext } from "../contexts/UserContext";
import profileImage from "../assets/profile-picture.png";
import { BsImage } from "react-icons/bs";
import { createPost } from "../services/postService";
import { usePostContext } from "../contexts/posts.context";

function CreatePostPopup({ closePopup }) {
  const { currentUserData } = useUserContext();
  const [updating, setUpdating] = useState(false);
  const { setAllPosts } = usePostContext();
  const postPicture = useRef();
  const textAreaRef = useRef();

  const [postData, setPostData] = useState({
    description: "",
    image: "",
    imageFile: null,
  });

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handlePostData = (e) => {
    if (e.target.name === "postPicture") {
      let file = e.target.files[0];
      if (file) {
        setPostData((prev) => ({
          ...prev,
          image: URL.createObjectURL(file),
          imageFile: file,
        }));
      }
    } else {
      let textData = e.target.value;
      setPostData((prev) => ({ ...prev, description: textData }));
    }
  };

  const removeSelectedImage = () => {
    setPostData((prev) => ({
      ...prev,
      image: "",
      imageFile: null,
    }));
    if (postPicture.current) {
      postPicture.current.value = "";
    }
  };

  const handlePostSubmit = async () => {
    if (!postData.description.trim() && !postData.imageFile) {
      toast.error("Post cannot be empty");
      return;
    }
    try {
      setUpdating(true);
      const formData = new FormData();
      formData.append("description", postData.description);

      if (postData.imageFile) {
        formData.append("imageFile", postData.imageFile);
        formData.append("image", postData.image);
      }

      const resp = await createPost(formData);
      toast.success("Post created successfully");
      
      setPostData({
        description: "",
        image: "",
        imageFile: null,
      });

      // Prepend the new post directly into feed context
      setAllPosts((prev) => {
        if (!prev) return { allPosts: [resp.message] };
        return {
          ...prev,
          allPosts: [resp.message, ...prev.allPosts],
        };
      });

      closePopup();
    } catch (error) {
      console.error("Post creation error:", error);
      toast.error("Failed to create post");
    } finally {
      setUpdating(false);
    }
  };

  // Close modal when clicking outside the dialog content box
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const isPostDisabled = !postData.description.trim() && !postData.imageFile;

  return (
    <div 
      onClick={handleOverlayClick}
      className="w-full h-full bg-black/50 backdrop-blur-xs fixed inset-0 flex justify-center items-center z-50 p-4"
    >
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Hidden File Input */}
        <input
          type="file"
          name="postPicture"
          hidden
          accept="image/*"
          ref={postPicture}
          onChange={handlePostData}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-[17px] font-semibold text-gray-800">Share your thoughts</h2>
          <button
            onClick={closePopup}
            className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-800 rounded-full transition-colors cursor-pointer"
          >
            <RxCross1 size={16} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          
          {/* User Row Info */}
          <div className="flex gap-3 items-center">
            <img
              src={currentUserData?.profilePic || profileImage}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover border border-gray-100"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-sm text-gray-900">
                {currentUserData?.firstname} {currentUserData?.lastname || ""}
              </h3>
              <div className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-2 py-0.5 rounded-full mt-1 cursor-pointer w-fit text-[10.5px] font-semibold text-gray-600 transition-colors">
                <span>🌐 Anyone</span>
                <span className="text-[8px]">▼</span>
              </div>
            </div>
          </div>

          {/* Text Area Input */}
          <div className="flex-1 flex flex-col min-h-[140px] mt-2">
            <textarea
              name="postText"
              ref={textAreaRef}
              placeholder="What do you want to talk about?"
              value={postData.description}
              onChange={handlePostData}
              className="w-full flex-1 focus:outline-none border-none text-[14.5px] text-gray-800 placeholder-gray-400 resize-none min-h-[140px]"
            />

            {/* Photo Attachment Preview */}
            {postData.image && (
              <div className="relative mt-3 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 max-h-64 flex justify-center items-center group">
                <img
                  src={postData.image}
                  alt="Attachment Preview"
                  className="max-h-64 object-contain w-full"
                />
                <button
                  type="button"
                  onClick={removeSelectedImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer shadow-md"
                  title="Remove Image"
                >
                  <RxCross1 size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
          {/* Media upload buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => postPicture.current.click()}
              className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-gray-200 rounded-full transition-colors cursor-pointer flex items-center justify-center"
              title="Add a photo"
            >
              <BsImage size={18} />
            </button>
          </div>

          {/* Post Submission Button */}
          <button
            type="submit"
            disabled={isPostDisabled || updating}
            onClick={handlePostSubmit}
            className="bg-blue-600 hover:bg-blue-750 disabled:opacity-40 disabled:hover:bg-blue-600 text-white font-semibold text-xs py-2 px-5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            {updating ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Posting...</span>
              </>
            ) : (
              <span>Post</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

export default CreatePostPopup;

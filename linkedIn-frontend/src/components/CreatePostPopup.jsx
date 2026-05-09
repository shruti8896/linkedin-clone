import React, { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import ActionButton from "./ActionButton";
import { useUserContext } from "../contexts/UserContext";
import profileImage from "../assets/profile-picture.png";
import { FaImage } from "react-icons/fa6";
import { createPost } from "../services/postService";

function CreatePostPopup({ closePopup }) {
  const { currentUserData } = useUserContext();
  const [updating, setUpdating] = useState(false);
  const postPicture = useRef();
  const [postData, setPostData] = useState({
    description: "",
    image: "",
    imageFile: null,
  });

  const handlePostData = (e) => {
    if (e.target.name == "postPicture") {
      let file = e.target.files[0];
      setPostData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
        imageFile: file,
      }));
    } else {
      let textData = e.target.value;
      setPostData((prev) => ({ ...prev, description: textData }));
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
      console.log(postData);

      formData.append("description", postData.description);
      console.log(formData);

      if (postData.imageFile) {
        formData.append("imageFile", postData.imageFile);
        formData.append("image", postData.image);
      }

      const resp = await createPost(formData);
      console.log(resp);
      toast.success("Post created");
      setPostData({
        description: "",
        image: "",
        imageFile: null,
      });
      closePopup();
      // console.log(responseData);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create post");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black/60 fixed top-0 flex justify-center z-10">
      <div className="md:w-[50%] w-[90%] max-h-[90vh] bg-white mt-10 rounded-xl px-4 overflow-y-auto flex flex-col pb-2 relative">
        <input
          type="file"
          name="postPicture"
          id=""
          hidden
          accept="image/*"
          ref={postPicture}
          onChange={handlePostData}
        />
        <div className="flex flex-col gap-5">
          {/* header */}
          <div className="flex flex-row items-center justify-between border-b ">
            <h2 className="text-2xl p-2">Create Post</h2>
            <ActionButton
              icon={<RxCross1 size={23} className="" />}
              onClick={closePopup}
            />
          </div>

          {/* body*/}

          <div className="flex gap-5 items-center">
            <div className="h-12 w-12 rounded-full  ">
              <img
                src={currentUserData?.profilePic || profileImage}
                alt=""
                className="h-12 w-12 rounded-full "
              />
            </div>
            <h1 className="text-2xl font-semibold">
              {currentUserData.username}
            </h1>
          </div>

          <div className="w-full min-h-[30vh] flex flex-col">
            {/* Text Area */}
            <textarea
              name="postText"
              placeholder="What do you want to talk about?"
              className="p-2 min-h-30 focus:outline-none border-none w-full resize-none"
              onChange={handlePostData}
              value={postData.description}
            />

            {/* Image Preview */}
            {postData.image && (
              <div className="mt-3 w-full">
                <img
                  src={postData.image}
                  alt="preview"
                  className="max-h-80 w-56 rounded-lg object-cover"
                />
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center w-[90%] justify-between mt-4 absolute bottom-2 ">
              <FaImage
                size={28}
                className="cursor-pointer text-gray-600 hover:text-blue-500 transition"
                onClick={() => postPicture.current.click()}
              />

              <button
                type="submit"
                disabled={updating}
                className="bg-blue-500 px-4 py-2 rounded-2xl text-white font-semibold flex items-center gap-2 disabled:opacity-50"
                onClick={handlePostSubmit}
              >
                {updating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Posting...
                  </>
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostPopup;

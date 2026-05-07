import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import ActionButton from "./ActionButton";
import { useUserContext } from "../contexts/UserContext";
import profileImage from "../assets/profile-picture.png";
import { FaImage } from "react-icons/fa6";

function CreatePostPopup() {
  const { currentUserData } = useUserContext();
  const [updating, setUpdating] = useState(false);
  return (
    <div className="w-full min-h-screen bg-black/60 fixed top-0 flex justify-center z-10">
      <div className="md:w-[50%] w-[90%] max-h-[90vh] bg-white mt-10 rounded-xl px-4 overflow-y-auto flex flex-col pb-2">
        <div className="flex flex-col gap-5">
          {/* header */}
          <div className="flex flex-row  items-center justify-between border-b ">
            <h2 className="text-2xl p-2">Create Post</h2>
            <ActionButton
              icon={<RxCross1 size={23} className="" />}
              onClick={() => toast.success("Closing")}
            />
          </div>

          {/* body*/}

          <div className="flex gap-5 items-center">
            <div className="h-12 w-12 rounded-full  ">
              <img
                src={currentUserData.profilePic || profileImage}
                alt=""
                className="h-12 w-12 rounded-full "
              />
            </div>
            <h1 className="text-2xl font-semibold">
              {currentUserData.username}
            </h1>
          </div>

          <div className="w-full h-[60vh] p-1 ">
            <div
              name="post"
              id=""
              contentEditable
              data-placeholder="Write-something..."
              className="text-xl empty:before:content-[attr(data-placeholder)] 
             empty:before:text-gray-400
             empty:before:pointer-events-none p-2 h-full focus:outline-none  border-none w-full"
            ></div>
            <FaImage size={30} className="p-1 m-2" />
          </div>
          <div className="flex mt-3 justify-end border-t border-gray-300 ">
            <button
              type="submit"
              className="bg-blue-500 px-3 py-1 my-3 rounded-2xl text-white font-semibold"
            >
              {updating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Updating...
                </>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostPopup;

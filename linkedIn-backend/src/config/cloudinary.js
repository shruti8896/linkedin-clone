import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

async function uploadOnCloudniary(filePath) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!filePath) {
      return null;
    }
    const uploadeImage = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    console.log(uploadeImage);

    return uploadeImage.secure_url;

    // const optimizeURL = cloudinary.url("shoes", {
    //   fetch_format: "auto",
    //   quality: "auto",
    // });
    // console.log(optimizeURL);

    // const autoCropUrl = cloudinary.url("shoes", {
    //   crop: "auto",
    //   gravity: "auto",
    //   width: 500,
    //   height: 500,
    // });

    console.log(autoCropUrl);
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log(error);
  }
}

export default uploadOnCloudniary;

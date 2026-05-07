export const ceratePostService = async (req) => {
  try {
    let { description } = req.body;
    let newPost;
    if (req.file) {
      let image = await uploadOnCloudniary(req.file.path);
      newPost = await postModel.create({
        description,
        author: req.userId,
        image,
      });
    } else {
      newPost = await postModel.create({
        description,
        author: req.userId,
      });
    }
  } catch (error) {
    console.log("error in saving post");
    throw error;
  }
};

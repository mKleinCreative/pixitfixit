const mongoCollections = require("../config/mongoCollections");
const commentcollection = mongoCollections.comment_collections;
const poteHolecollection = mongoCollections.poteHolecollection;
const userCollection = mongoCollections.user_collection;
const { ObjectId } = require("mongodb");

const CreateComment = async (user_id, pothole_id, message, PhotoUrL) => {
  if (!user_id || typeof user_id !== "string") throw "Invalid UserID";
  if (!pothole_id || typeof pothole_id !== "string") throw "Invalid UserID";
  if (!message || typeof message !== "string") throw "Invalid UserID";
  if (message.length < 3) throw "This message is too short";
  if (!PhotoUrL || typeof PhotoUrL !== "string") throw "Invalid Photo";

  let userDbCheck = await userCollection.exists({ _id: user_id });

  if (userDbCheck == false) throw "this user does not exist!";

  let potholeDbCheck = await poteHolecollection.exists({ _id: pothole_id });

  if (potholeDbCheck == false) throw "This pothole does not exist!!";

  // insert the comment into the array of comments in the Pothole!

  const comments = await commentcollection();
  const newComment = {
    user_id: user_id,
    message: message,
    PhotoUrL: PhotoUrL,
  };
  const insertedComment = await comments.insertOne(newComment);
  if (insertedComment.acknowledged === true) {
    console.log(newComment);
    return newComment;
  } else {
    throw "this did not work!";
  }
};

const GetAllPotholeComments = async (pothole_id) => {
  if (!pothole_id || typeof pothole_id !== "string")
    throw "this is not a valid potholeId!";

  const potholes = await poteHolecollection();

  try {
    const allPotholes = await potholes
      .find({}, { projection: { comments: 1 } })
      .toArray();

    if (!allPotholes) throw "there are no comments for this pothole!";

    const allPotholeComments = allPotholes
      .map((pothole) => pothole.comments)
      .flat();

    return allPotholeComments;
  } catch (error) {
    throw "Not able to retreieve pothole comment!";
  }
  // where am I placing the comments? are they going to the user table? are we just going to display the whole thing?
};
const GetAllCommentsByUser = async (user_id) => {
  //find all comments by user id
  if (!user_id || typeof user_id !== "string") throw "this user is invalid";

  const findUserComment = await commentcollection.find(
    { user_id: user_id },
    { projection: { _id: 1, user_id: 1, message: 1, PhotoUrL: 1 } }
  );
  if (findUserComment.length == 0) throw `${user_id} has no comments`;
};

const DeleteComment = async (comment_id) => {
  // by comment id
  if (!comment_id || typeof comment_id != "string")
    throw "This is not a valid commentid!";
  const deletedComment = await commentcollection.deleteOne({ _id: comment_id });

  if (deletedComment.length == 0) throw `${comment_id} was not deleted`;
};

module.exports = {
  CreateComment,
  GetAllCommentsByUser,
  DeleteComment,
  GetAllPotholeComments,
};
// const EditComment = async() => {} Maybe!

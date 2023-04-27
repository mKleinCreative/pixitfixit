import { comment } from "../db/collections";
import { users } from "../db/collections";
import { pothole } from "../db/collections";
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

  const commentCollection = await comment();

  const newComment = {
    user_id: user_id,
    message: message,
    PhotoUrL: PhotoUrL,
  };

  const insertedComment = await commentCollection.insertOne(newComment);

  const commentId = insertedComment.insertedId;

  const usercollections = await users();
  const potHoleCollections = await pothole();

  const useridCollection = usercollections.updateOne(
    { _id: user_id },
    { $push: { comment: commentId } }
  );

  const potholeidCollection = potHoleCollections.updateOne(
    { _id: pothole_id },
    { $push: { comments: commentId } }
  );

  if (
    insertedComment.acknowledged === true &&
    useridCollection.acknowledged === true &&
    potholeidCollection.acknowledged == true
  ) {
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
};
const GetAllCommentsByUser = async (user_id) => {
  //find all comments by user id
  if (!user_id || typeof user_id !== "string") throw "this user is invalid";

  const findUserComment = await commentcollection.find(
    { user_id: user_id },
    { projection: { _id: 1, user_id: 1, message: 1, PhotoUrL: 1 } }
  );
  if (findUserComment.acknowledged === false)
    throw `${user_id} has no comments`;
};

const DeleteComment = async (comment_id, user_id) => {
  // by comment id
  // need to also delete comment_ids from pothole collection and also user collection

  if (!comment_id || typeof comment_id != "string")
    throw "This is not a valid commentid!";

  const commentcollection = await comment();
  const userCollection = await users();
  const poteHolecollection = await pothole();

  const commentid = await userCollection.updateOne(
    { _id: user_id },
    { $pull: { comment: comment_id } }
  );

  const potholeid = await poteHolecollection.updateOne(
    { _id: user_id },
    { $pull: { comments: comment_id } }
  );

  const deletedComment = await commentcollection.deleteOne({ _id: comment_id });

  if (
    deletedComment.acknowledged === false &&
    potholeid.acknowledged === false &&
    commentid.acknowledged === false
  )
    throw `${comment_id} was not deleted`;
};

module.exports = {
  CreateComment,
  GetAllCommentsByUser,
  DeleteComment,
  GetAllPotholeComments,
};
// const EditComment = async() => {} Maybe!

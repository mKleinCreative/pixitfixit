import { comment } from "../db/collections";
import { users } from "../db/collections";
import { pothole } from "../db/collections";
const { ObjectId } = require("mongodb");

let exportedMethods = {
  async CreateComment(user_id, pothole_id, message, PhotoUrL) {
    if (!user_id || typeof user_id !== "string") throw "Invalid UserID";
    if (!pothole_id || typeof pothole_id !== "string") throw "Invalid UserID";
    if (!message || typeof message !== "string") throw "Invalid UserID";
    if (message.length < 3) throw "This message is too short";
    if (!PhotoUrL || typeof PhotoUrL !== "string") throw "Invalid Photo";

    const parsedId = ObjectId(user_id);

    const parsedPotholeID = ObjectId(pothole_id);
    const commentCollection = await comment();
    const usercollections = await users();
    const potHoleCollections = await pothole();

    let userDbCheck = await users.exists({ _id: parsedId });

    if (userDbCheck == false) throw "this user does not exist!";

    let potholeDbCheck = await pothole.exists({ _id: parsedPotholeID });

    if (potholeDbCheck == false) throw "This pothole does not exist!!";

    // insert the comment into the array of comments in the Pothole!

    const newComment = {
      user_id: parsedId,
      message: message,
      PhotoUrL: PhotoUrL,
    };

    const insertedComment = await commentCollection.insertOne(newComment);

    const commentId = insertedComment.insertedId;

    const useridCollection = usercollections.updateOne(
      { _id: parsedId },
      { $push: { comment: commentId } }
    );

    const potholeidCollection = potHoleCollections.updateOne(
      { _id: parsedPotholeID },
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
  },
  async GetAllPotholeComments(pothole_id) {
    if (!pothole_id || typeof pothole_id !== "string")
      throw "this is not a valid potholeId!";

    const parsedPotholeID = ObjectId(pothole_id);

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
  },
  async GetAllCommentsByUser(user_id) {
    //find all comments by user id
    if (!user_id || typeof user_id !== "string") throw "this user is invalid";

    const commentcollection = await comment();
    const parsedCommentID = ObjectId(user_id);

    const findUserComment = await commentcollection.find(
      { user_id: parsedCommentID },
      { projection: { _id: 1, user_id: 1, message: 1, PhotoUrL: 1 } }
    );
    if (findUserComment.acknowledged === false)
      throw `${parsedCommentID} has no comments`;
  },
  async DeleteComment(comment_id, user_id) {
    // by comment id
    // need to also delete comment_ids from pothole collection and also user collection

    if (!comment_id || typeof comment_id != "string")
      throw "This is not a valid commentid!";

    const commentcollection = await comment();
    const userCollection = await users();
    const poteHolecollection = await pothole();

    const parsedUserid = ObjectId(user_id);
    const parsedCommentid = ObjectId(comment_id);

    const commentid = await userCollection.updateOne(
      { _id: parsedUserid },
      { $pull: { comment: parsedCommentid } }
    );

    const potholeid = await poteHolecollection.updateOne(
      { _id: parsedUserid },
      { $pull: { comments: parsedCommentid } }
    );

    const deletedComment = await commentcollection.deleteOne({
      _id: parsedCommentid,
    });

    if (
      deletedComment.acknowledged === false &&
      potholeid.acknowledged === false &&
      commentid.acknowledged === false
    )
      throw `${parsedCommentid} was not deleted`;
  },
};

export default exportedMethods;

// const EditComment = async() => {} Maybe!

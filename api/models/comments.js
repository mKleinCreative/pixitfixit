// const createComment = async (
//   user_id,
//   Pothole_id,
//   Message
//   // photo_url
// ) => {
//   let newcomment = {
//     user_id: user_id,
//     Pothole_id: Pothole_id,
//     Message: Message,
//   };

//   const commentcollection = await comment();
//   const insertedcomment = await commentcollection.insertOne(newcomment);

//   if (insertedcomment.acknowledged === true) {
//     console.log(newcomment);
//     return newcomment;
//   } else {
//     throw "this did not work!";
//   }
// };
const mongoose = require('mongodb');
const Schema = mongoose.Schema

const commentSchema = new Schema({
    user_id: {
        type: mongodb.ObjectId,
        required: true 
    },
    Pothole_id: {
        type: mongodb.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    PhotoUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);
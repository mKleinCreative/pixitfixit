// import { users } from "../db/collections.js";
// import bcrypt from "bcryptjs/dist/bcrypt.js";
// const createUser = async (
//   firstName,
//   LastName,
//   Email,
//   address,
//   password,
//   Role,
//   //   comment,
//   //   potholes,
//   username,
//   Birthday
// ) => {
//   const passwordHash = await bcrypt.hash(password, 10);
//   // console.log(passwordHash)
//   // error
//   let pothole = [];
//   // should i make another variable that holds an empty array.
//   let newUser = {
//     firstName: firstName,
//     LastName: LastName,
//     Email: Email,
//     address: address,
//     password: passwordHash,
//     Role: Role,
//     // comment: comment,
//     // potholes: potholes,
//     username: username,
//     Birthday: Birthday,
//   };

//   const usercollection = await users();
//   const insertedUser = await usercollection.insertOne(newUser);

//   if (insertedUser.acknowledged === true) {
//     console.log(newUser);
//     return newUser;
//   } else {
//     throw "this did not work!";
//   }
// };
// export default createUser;
const mongoose = require("mongodb");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    User: {
      type: String,
    },
    Admin: {
      type: String,
    },
    Worker: {
      type: String,
    },
  },
  comments: {
    type: [commentid],
    default: undefined,
  },
  assignedPotholes: {
    type: [potholeid],
    default: undefined,
  },
  restricted: false,
  potholes: {
    type: [potholes],
    default: undefined,
  },
  date: {
    //need to add the date requirements
  },
});

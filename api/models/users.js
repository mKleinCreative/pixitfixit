import { users } from "../db/collections.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
const createUser = async (
  firstName,
  LastName,
  Email,
  address,
  password,
  Role,
  //   comment,
  //   potholes,
  username,
  Birthday
) => {
  const passwordHash = await bcrypt.hash(password, 10);
  // console.log(passwordHash)
  // error
  let pothole = [];
  // should i make another variable that holds an empty array.
  let newUser = {
    firstName: firstName,
    LastName: LastName,
    Email: Email,
    address: address,
    password: passwordHash,
    Role: Role,
    // comment: comment,
    // potholes: potholes,
    username: username,
    Birthday: Birthday,
  };

  const usercollection = await users();
  const insertedUser = await usercollection.insertOne(newUser);

  if (insertedUser.acknowledged === true) {
    console.log(newUser);
    return newUser;
  } else {
    throw "this did not work!";
  }
};
export default createUser;

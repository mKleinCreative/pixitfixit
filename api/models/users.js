import { user } from "../_db/collection.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
const createUser = async (
  firstName,
  LastName,
  Email,
  address,
  password,
  Role,
  comment,
  potholes,
  username,
  Age
) => {

    const passwordHash = await bcrypt.hash(password, 10)
// console.log(passwordHash)

  let newUser = {
    firstName: firstName,
    LastName: LastName,
    Email: Email,
    address: address,
    password: passwordHash,
    Role: Role,
    comment: comment,
    potholes: potholes,
    username: username,
    Age: Age,
  };

  const usercollection = await user();
  const insertedUser = await usercollection.insertOne(newUser);

  if (insertedUser.acknowledged === true) {
    console.log(newUser);
    return newUser;
  } else {
    throw "this did not work!";
  }
};
export default createUser;
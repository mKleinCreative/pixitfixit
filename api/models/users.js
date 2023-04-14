import { user } from "../_db/collection.js";

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
  let newUser = {
    firstName: firstName,
    LastName: LastName,
    Email: Email,
    address: address,
    password: password,
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
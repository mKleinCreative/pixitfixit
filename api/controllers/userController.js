const mongoCollections = require('../config/mongoCollections');
const userCollection = mongoCollections.user_collection;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

const createUser = async (username, password, isAdmin = false) => {
  if (!username || typeof username !== 'string' || !usernameRegex.test(username)) {
    throw new Error('Username must be a non-empty alphanumeric string with at least 4 characters and no spaces');
  }

  if (!password || typeof password !== 'string' || !passwordRegex.test(password)) {
    throw new Error('Password must be a non-empty string with at least 6 characters, including one uppercase character, one number, and one special character');
  }

  const users = await userCollection();
  const userExists = await users.findOne({ username: username.toLowerCase() });

  if (userExists) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = {
    username: username.toLowerCase(),
    password: hashedPassword,
    isAdmin,
  };

  const insertInfo = await users.insertOne(newUser);
  if (insertInfo.insertedCount === 0) {
    throw new Error('Failed to create user');
  }

  return { insertedUser: true };
};

const checkUser = async (username, password) => {
  if (!username || typeof username !== 'string' || !usernameRegex.test(username)) {
    throw new Error('Username must be a non-empty alphanumeric string with at least 4 characters and no spaces');
  }

  if (!password || typeof password !== 'string' || !passwordRegex.test(password)) {
    throw new Error('Password must be a non-empty string with at least 6 characters, including one uppercase character, one number, and one special character');
  }

  const users = await userCollection();
  const user = await users.findOne({ username: username.toLowerCase() });

  if (!user) {
    throw new Error('Either the username or password is invalid');
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new Error('Either the username or password is invalid');
  }

  return { authenticatedUser: true };
};

const FindUser = async (username) => {
  if (!username || typeof username !== 'string' || !usernameRegex.test(username)) {
    throw new Error('Username must be a non-empty alphanumeric string with at least 4 characters and no spaces');
  }

  const users = await userCollection();
  return await users.findOne({ username: username.toLowerCase() });
};

const ChangePermissions = async (username, isAdmin) => {
  const user = await FindUser(username);

  if (!user) {
    throw new Error('User not found');
  }

  const users = await userCollection();
  return await users.updateOne({ _id: user._id }, { $set: { isAdmin } });
};

const RestrictUser = async (username) => {
  return await ChangePermissions(username, false);
};

const AdminCheck = async (username) => {
  const user = await FindUser(username);

  if (!user) {
    throw new Error('User not found');
  }

  return user.isAdmin;
};

const DeleteUser = async (username) => {
  const user = await FindUser(username);

  if (!user) {throw new Error('User not found');
}

const users = await userCollection();
return await users.deleteOne({ _id: user._id });
};

module.exports = {
createUser,
checkUser,
FindUser,
ChangePermissions,
RestrictUser,
AdminCheck,
DeleteUser,
};
   

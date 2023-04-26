const mongoCollections = require('../config/mongoCollections');
import { users } from "../db/collections.js";
const userCollection = mongoCollections.user_collection;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createUser = async (
  firstName,
  lastName,
  email,
  password,
  role,
  comment,
  assignedPotholes,
  potholesCreated,
  username,
  birthday
) => {
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    throw new Error('Email must be a valid email address');
  }

  if (!password || typeof password !== 'string' || !passwordRegex.test(password)) {
    throw new Error('Password must be a non-empty string with at least 6 characters, including one uppercase character, one number, and one special character');
  }

  if (!username || typeof username !== 'string' || !usernameRegex.test(username)) {
    throw new Error('Username must be a non-empty alphanumeric string with at least 4 characters and no spaces');
  }

  const users = await userCollection();
  const userExists = await users.findOne({ email: email.toLowerCase() });

  if (userExists) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = {
    firstName,
    lastName,
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
    comment,
    assignedPotholes,
    potholesCreated,
    username,
    birthday,
    restricted: false
  };

  const insertInfo = await users.insertOne(newUser);
  if (insertInfo.insertedCount === 0) {
    throw new Error('Failed to create user');
  }

  return { insertedUser: true };
};

const checkUser = async (email, password) => {
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    throw new Error('Email must be a valid email address');
  }

  if (!password || typeof password !== 'string' || !passwordRegex.test(password)) {
    throw new Error('Password must be a non-empty string with at least 6 characters, including one uppercase character, one number, and one special character');
  }

  const users = await userCollection();
  const user = await users.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw new Error('Either the email or password is invalid');
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new Error('Either the email or password is invalid');
  }

  return { authenticatedUser: true };
};

const FindUser = async (email) => {
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    throw new Error('Email must be a valid email address');
  }

  const users = await userCollection();
  return await users.findOne({ email: email.toLowerCase() });
};

const ChangePermissions = async (email, role) => {
  const user = await FindUser(email);

  if (!user) {
    throw new Error('User not found');
  }

  const users = await userCollection();
  return await users.updateOne({ _id: user._id },
    { $set: { role } });
};

const RestrictUser = async (email) => {
const user = await FindUser(email);

if (!user) {
throw new Error('User not found');
}

const users = await userCollection();
return await users.updateOne({ _id: user._id }, { $set: { restricted: true } });
};

const AdminCheck = async (email) => {
const user = await FindUser(email);

if (!user) {
throw new Error('User not found');
}

return user.role === 'admin';
};

const DeleteUser = async (email) => {
const user = await FindUser(email);

if (!user) {
throw new Error('User not found');
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

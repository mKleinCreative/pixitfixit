import { users } from "../db/collections.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { ObjectId } from "mongodb";
const saltRounds = 10;

const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Create a new user.
 *
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {string} role - The user's role.
 * @param {string} comments - The user's comment.
 * @param {Array} assignedPotholes - The potholes assigned to the user.
 * @param {Array} potholesCreated - The potholes created by the user.
 * @param {Date} birthday - The user's birthday.
 * @throws {Error} If there is an issue with the input or user creation fails.
 */

let exportedMethods = {
  async createUser(
    firstName,
    lastName,
    email,
    password,
    birthday,
    zipcode
  ) {
    // Validate input
    console.log('inside createUser');
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      throw new Error("Email must be a valid email address");
    }
    if (
      !password ||
      typeof password !== "string" ||
      !passwordRegex.test(password)
    ) {
      throw new Error(
        "Password must be a non-empty string with at least 6 characters, including one uppercase character, one number, and one special character"
      );
    }

    // Check for existing user
    const usersCollection = await users();
    const userExists = await usersCollection.findOne({
      email: email.toLowerCase(),
    });

    if (userExists) {
      throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user object
    const newUser = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
      comments: [],
      assignedPotholes: [],
      potholesCreated: [],
      birthday,
      zipcode,
      restricted: false,
    };
    console.log(`in usersController looking at a ${newUser}`)

    // Insert user into database

    const insertInfo = await usersCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) {
      throw new Error("Failed to create user");
    }

    return { insertedUser: true };
  },
  /**
   * Check if a user with the given email and password exists.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @throws {Error} If the email or password is invalid.
   */
  async checkUser(email, password) {
    // Validate input
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      throw new Error("Email must be a valid email address");
    }
    if (
      !password ||
      typeof password !== "string" ||
      !passwordRegex.test(password)
    ) {
      throw new Error(
        "Password must be a non-empty string with at least 6 characters, including one uppercase character, one number, and one special character"
      );
    }

    // Find user in database
    const usersCollection = await users();
    const user = await usersCollection.findOne({ email: email.toLowerCase() });

    // Validate user
    if (!user) {
      throw new Error("Either the email or password is invalid");
    }

    // Check password
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new Error("Either the email or password is invalid");
    }

    return { authenticatedUser: true };
  },

  /**
    
    Find a user by their email address.
    @param {string} email - The user's email address.
    @throws {Error} If the email is invalid.
    */
  async findUser(email) {
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      throw new Error("Email must be a valid email address");
    }
    const usersCollection = await users();
    return await usersCollection.findOne({ email: email.toLowerCase() });
  },

  async findUserByID(id) {
    const usersCollection = await users();
    return await usersCollection.findOne({ _id: ObjectId(id) });
  },

  /**
    
    Change the permissions (role) of a user.
    @param {string} email - The user's email address.
    @param {string} role - The new role for the user.
    @throws {Error} If the user is not found.
    */
  async changePermissions(email, role) {
    const user = await findUser(email);
    if (!user) {
      throw new Error("User not found");
    }

    const usersCollection = await users();
    return await usersCollection.updateOne(
      { _id: user._id },
      { $set: { role } }
    );
  },

  /**
    
    Restrict a user's access.
    @param {string} email - The user's email address.
    @throws {Error} If the user is not found.
    */
  async restrictUser(email) {
    const user = await findUser(email);
    if (!user) {
      throw new Error("User not found");
    }

    const usersCollection = await users();
    return await usersCollection.updateOne(
      { _id: user._id },
      { $set: { restricted: true } }
    );
  },

  /**
    
    Check if a user has admin permissions.
    @param {string} email - The user's email address.
    @throws {Error} If the user is not found.
    */
  async isAdmin(email) {
    const user = await findUser(email);
    if (!user) {
      throw new Error("User not found");
    }

    return user.role === "admin";
  },

  /**
    
    Get users
    @throws {Error} If no users
    */
    async getAllUsers() {
      const usersCollection = await users();
      return await usersCollection.find({}).toArray();
    },

  /**
    
    Delete a user by their user id.
    @param {id} id - The user's id .
    @throws {Error} If the user id is not found.
    */
  async deleteUser(id) {
    // const user = await findUserByID(id);

    // if (!user) {
    //   throw new Error("User not found");
    // }

    const usersCollection = await users();
    const parsedId = new ObjectId(id)

    console.log('id in delete user', parsedId)
    return await usersCollection.deleteOne({ _id: parsedId });
  },
};

export default exportedMethods;

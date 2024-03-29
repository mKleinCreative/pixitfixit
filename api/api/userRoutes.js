import express from "express"
import { userController } from "../controllers/index.js";

const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    console.log("I am req.body", req.body)
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      zipcode
    } = req.body;


    await userController.createUser(
      firstName,
      lastName,
      email,
      password,
      age,
      zipcode
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await userController.checkUser(email, password);
    const loggedInUser = await userController.findUser(email);
    res.status(200).json({ message: "Authenticated successfully", data: loggedInUser });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get("/findUser/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userController.findUser(email);
    res.status(200).json(user);
    return user
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/updateUser", async (req, res) => {
  try {
    const { id } = req.body;
    const user = await userController.updateUser(id);
    res.status(200).json(user);
    return user
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.patch("/changePermissions/", async (req, res) => {
  try {
    const { email, role } = req.body;
    await userController.changePermissions(email, role);
    res.status(200).json({ message: "Permissions changed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/restrictUser", async (req, res) => {
  try {
    const { email } = req.body;
    await userController.restrictUser(email);
    res.status(200).json({ message: "User access restricted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/isAdmin", async (req, res) => {
  try {
    const { email } = req.body;
    const isAdmin = await userController.isAdmin(email);
    res.status(200).json({ isAdmin });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/deleteUser/:id", async (req, res) => {
  try {
    console.log('In delete user', req.params)
    const { id } = req.params;
    await userController.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;

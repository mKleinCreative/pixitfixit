const router = express.Router();
import { userData } from "../controllers/index.js";
router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      comment,
      assignedPotholes,
      potholesCreated,
      username,
      birthday,
    } = req.body;

    await userData.createUser(
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
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await userData.checkUser(email, password);
    res.status(200).json({ message: "Authenticated successfully" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get("/findUser/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userData.findUser(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.patch("/changePermissions/:email/:role", async (req, res) => {
  try {
    const { email, role } = req.params;
    await userData.changePermissions(email, role);
    res.status(200).json({ message: "Permissions changed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/restrictUser/:email", async (req, res) => {
  try {
    const { email } = req.params;
    await userData.restrictUser(email);
    res.status(200).json({ message: "User access restricted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/isAdmin/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const isAdmin = await userData.isAdmin(email);
    res.status(200).json({ isAdmin });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete("/deleteUser/:email", async (req, res) => {
  try {
    const { email } = req.params;
    await userData.deleteUser(email);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;

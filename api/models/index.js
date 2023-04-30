import exportedMethods from "../controllers/usersController.js";
// import createPothole from "./potholes.js";

(async () => {
  await exportedMethods.createUser(
    "Jerell",
    "Mendoza",
    "Jerell@gpmail.org",
    "Jerel1234!",
    "user",
    "This pothole is too much",
    "Admin",
    "6441e1ed23c3324645e81114",
    "6441e1ed23c3324645e81114",
    "Jerell123456",
    "05/01/1999"
  );
})();

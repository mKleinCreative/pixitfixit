import {
  userController,
  potholeController,
  commentController,
} from "../controllers/index.js";

// import createPothole from "./potholes.js";

(async () => {
  // await userController.createUser(
  //   "Jerell",
  //   "Mendoza",
  //   "Jerell@gpmail.org",
  //   "Jerel1234!",
  //   "user",
  //   "This pothole is too much",
  //   "Admin",
  //   "6441e1ed23c3324645e81114",
  //   "6441e1ed23c3324645e81114",
  //   "Jerell123456",
  //   "05/01/1999"
  // );
  await potholeController.CreatePotHole(
    "6441e1ed23c3324645e81114",
    "Open",
    "https://www.cityworks.com/wp-content/uploads/2020/01/pot-hole-blog.gif",
    "37.9101",
    "122.0652",
    "6441e1ed23c3324645e81114",
    "94596",
    "[]"
  );
  await commentController.CreateComment(
    "6441e1ed23c3324645e81114",
    "644de16e1f556bafa829eef6",
    "Here is the pothole",
    "https://www.cityworks.com/wp-content/uploads/2020/01/pot-hole-blog.gif"
  );
})();

import potholeRoutes from "./potholeRoutes.js";
import userRoutes from "./userRoutes.js";
import commentRoutes from "./commentRoutes.js";

const constructorMethod = (app) => {
  app.use("/potholeRoutes", potholeRoutes);
  app.use("/userRoutes", userRoutes);
  app.use("/commentRoutes", commentRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;

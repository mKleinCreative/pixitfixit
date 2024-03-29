import express from "express";
import configRoutes from "./config/keys.js";
import session from "express-session";
import bodyParser from "body-parser";
import api from "./api/api/index.js";
// import cors from 'cors'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(api);
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
// app.use(
//   session({
//     name: "AuthCookie",
//     secret: "some secret string!",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 * 30 }, // 30 minutes
//   })
// );

// // Logging middleware
// app.use((req, res, next) => {
//   const now = new Date().toUTCString();
//   const method = req.method;
//   const route = req.originalUrl;
//   const isAuthenticated = req.session.username
//     ? "Authenticated User"
//     : "Non-Authenticated User";
//   console.log(`[${now}] ${method} ${route} (${isAuthenticated})`);
//   next();
// });

// // Authentication middleware
// const authMiddleware = (req, res, next) => {
//   if (!req.session.username) {
//     res.status(403).render("forbiddenAccess", { title: "Forbidden Access" });
//   } else {
//     next();
//   }
// };

// // Use authentication middleware for the /protected route
// app.use("/forbiddenAccess", authMiddleware);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

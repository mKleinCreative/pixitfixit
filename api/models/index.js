import createUser from "./users.js";
// import createPothole from "./potholes.js";

(async () => {
  await createUser(
    "Jerell",
    "Mendoza",
    "Jerell@gpmail.ord",
    "08901",
    "P@ssw0rd",
    "Admin",
    "6441e1ed23c3324645e81114",
    "6441e1ed23c3324645e81114",
    "true",
    "6441e1ed23c3324645e81114",
    "Jerell123456",
    "05/01/1999"
  );
})();

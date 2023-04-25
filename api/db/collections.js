import connect from "./connect.js";

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await connect.dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

// NOTE: YOU WILL NEED TO CHANGE THE CODE BELOW TO HAVE THE COLLECTION(S) REQUIRED BY THE ASSIGNMENT
// export const posts = getCollectionFn('posts');
export const users = getCollectionFn("users");
export const pothole = getCollectionFn("pothole");
export const comment = getCollectionFn("comments");

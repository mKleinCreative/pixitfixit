import { MongoClient } from "mongodb";
import dbAccessString from "../../config/keys.js";
let _connection = undefined;
let _db = undefined;

export default {
  dbConnection: async () => {
    if (!_connection) {
      const client = new MongoClient(
        "mongodb+srv://dbAdmin:VwaA6T0PBbsM3OcY@pixitfixit.tsqeaxx.mongodb.net/?retryWrites=true&w=majorityssString"
      );

      _connection = await client.connect();
      _db = await _connection.db(pixitfixit);
    }

    return _db;
  },
  closeConnection: () => {
    _connection.close();
  },
};

import { MongoClient } from "mongodb";
import { mongoConfig } from "./config.js";

let _connection = undefined;
let _db = undefined;

export default {
  dbConnection: async () => {
    if (!_connection) {
      const client = new MongoClient(
        "mongodb+srv://dbAdmin:VwaA6T0PBbsM3OcY@pixitfixit.tsqeaxx.mongodb.net/?retryWrites=true&w=majority"
      );

      _connection = await client.connect();
      _db = await _connection.db(mongoConfig.database);
    }

    return _db;
  },
  closeConnection: () => {
    _connection.close();
  },
};

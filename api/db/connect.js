const MongoClient = require("mongodb").MongoClient;
const { dbAccessString } = require("../../config/keys.js");

let _connection = undefined;
let _db = undefined;

module.exports = {
  dbConnection: async () => {
    if (!_connection) {
      _connection = await MongoClient.connect(dbAccessString);
      _db = await _connection.db(pixitfixit);
    }

    return _db;
  },
  closeConnection: () => {
    _connection.close();
  },
};

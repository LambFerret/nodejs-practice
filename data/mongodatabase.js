const { MongoClient } = require('mongodb');
const uri = require("./poolConfig").mongo

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err,client) => {
  if (err) console.log('failed to connect MongoDB')
  else {
    console.log('MongoDB is connected')
}
});

module.exports = client;
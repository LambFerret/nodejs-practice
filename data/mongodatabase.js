const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://root:root1234@cluster0.qcnmf.mongodb.net/thisisnewname?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err,client) => {
  if (err) console.log('failed to connect MongoDB')
  else {
    console.log('MongoDB is connected')
}
});

module.exports = client;
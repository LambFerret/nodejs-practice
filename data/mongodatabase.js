const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://root:root1234@cluster0.qcnmf.mongodb.net/thisisnewname?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err,client) => {
  if (err) console.log('failed to connect')
  else {
    console.log('connected')
}
});
//connect MongoDB
// perform actions on the collection object
module.exports = client;
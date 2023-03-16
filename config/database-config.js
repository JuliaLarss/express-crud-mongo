const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const db_url = 'mongodb+srv://jula0013:MongoTest!.@cluster0.zbytueo.mongodb.net/movies_db?retryWrites=true&w=majority';

const connection = () => {
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log('Database connected!'))
.catch(e=>console.log(e));

};

module.exports = connection; 
const mongoose = require('mongoose');
const connection = "mongodb+srv://anajrj:Jai%40aaic12@cluster0.zotfl.mongodb.net/TShirts?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
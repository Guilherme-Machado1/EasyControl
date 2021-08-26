const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  senha: { type: String, required: true }
});

const UserModel = mongoose.model('User', UserSchema);

class User {
    constructor(body){
        this.body = body;
        this.User = null;
    }
    

}

// module.exports = User;

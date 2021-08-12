const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  senha: { type: String, required: true }
});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home {
    constructor(body){
      this.body = body;
      this.errors = [];
      this.user = null;
    }

     async login(){
      this.cleanUp();
      if(this.errors.length > 0) return;
        this.user = await HomeModel.findOne({senha: this.body.senha, usuario: this.body.usuario});
        if(this.user === null){
          this.errors.push('Senha ou usuário incorretas');
          console.log(this.user);
          return;
        }
        console.log(this.user);
    }


    cleanUp(){
      for(let key in this.body){
        if(typeof key !== 'string'){
          this.body[key] = '';
        }
      }

      this.body = {
        usuario: this.body.usuario,
        senha: this.body.senha
      }
    }

}

module.exports = Home;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
       try {
        this.cleanUp();
        if(this.errors.length > 0) return;
          this.user = await HomeModel.findOne({usuario: this.body.usuario});
          if(!this.user){
            this.errors.push('Usuário não está cadastrado');
            return;
          }

          if(!bcrypt.compareSync(this.body.senha, this.user.senha)){
            this.errors.push('Senha incorreta');
            this.user = null;
            return;
          }
       } catch (error) {
        console.log(error);
        res.render('404');
       }
      
    }

    async cadastroUser(){
      try {
        this.cleanUp
        this.userExistente();
        const salt = bcrypt.genSaltSync();
        this.body.senha = bcrypt.hashSync(this.body.senha, salt);
        this.user = await HomeModel.create(this.body);
      } catch (error) {
        console.log(error);
        res.render('404');
      }
    }

    async userExistente(){
      this.user = await HomeModel.findOne({usuario: this.body.usuario});
      if(this.user) this.errors.push('Este usuário já existe');
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

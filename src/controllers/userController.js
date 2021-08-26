const session = require('express-session');
const Home = require('../models/HomeModel');

// renderiza a pagina de tela de cadastro
exports.paginaCadastroUser = (req, res) => {
  res.render('telaCadastroUser');
  return;
};


// Cadastra um novo Usuário
exports.cadastroUser = async (req, res) => {
  try {
    const cadastro = new Home(req.body);
    await cadastro.cadastroUser();
    if(cadastro.errors.length > 0){
      req.flash('errors', cadastro.errors);
      req.session.save(function(){
      return res.redirect('/cadastrarUsuario');
      });
      return;
    }
    
    req.flash('success', 'O novo Usuario foi Cadastrado com sucesso');
      req.session.save(function(){
      return res.redirect('/cadastrarUsuario');
      });
  } catch (error) {
    console.log(error);
    res.render('404');
  } 
}






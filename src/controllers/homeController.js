const session = require('express-session');
const Home = require('../models/HomeModel');
exports.paginaInicial = (req, res) => {
  res.render('index', {
    titulo: 'Este será o título da página',
    numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  });
  return;
};

exports.login = async (req, res) => {
  try {
    const login = new Home(req.body);
    await login.login();

    if(login.errors.length > 0){
      req.flash('errors', login.errors);
      req.session.save(function(){
      return res.redirect('back');
      });
      return;
    }
  
    if(!login.user){
      req.flash('errors', login.errors);
      req.session.save(function(){
      return res.redirect('back');
      });
      return;
    }
  
      req.flash('success', 'O login foi feito com sucesso');
      req.session.user = login.user;
      req.session.save(function(){
      return res.redirect('/telaInicial');
      });
  }catch (error) {
    throw new Error(error);
  }
    
  
}

exports.exibeTela = (req, res) => {
  res.render('telaInicial');
  return;
};

exports.logoff = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const session = require('express-session');
const Home = require('../models/HomeModel');
exports.paginaInicial = (req, res) => {
  if(req.session.user) return res.render('TelaInicial');
  res.render('index');
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
    console.log(error);
    res.render('404');
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

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
    }
  
    if(!login.user){
      req.flash('errors', 'algo deu errado');
      req.session.save(function(){
      return res.redirect('back');
      });
    }
  

    req.flash('success', 'O login foi feito com sucesso');
    req.session.user = login.user;
    req.session.save(function(){
      return res.render('telaInicial');
    });
  
    
  }catch (error) {
    console.log(error);
    res.redirect("404");
  }
    
  
}

exports.logoff = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const session = require('express-session');
const Cadastro = require('../models/CadastroModel');
// renderiza a pagina de tela de cadastro
exports.paginaInicial = (req, res) => {
  res.render('telaCadastro');
  return;
};


// Cadastra um novo produto
exports.cadastrar = async (req, res) => {
  try {
    const cadastro = new Cadastro(req.body);
    await cadastro.cadastrar();
    if(cadastro.errors.length > 0){
      req.flash('errors', cadastro.errors);
      req.session.save(function(){
      return res.redirect('back');
      });
      return;
    }
    
    if(!cadastro.produto){
      req.flash('errors', cadastro.errors);
      req.session.save(function(){
      return res.redirect('back');
      });
      return;
    }
    req.flash('success', 'O novo produto foi adicionado com sucesso');
      req.session.save(function(){
      return res.redirect('/cadastrarItem');
      });
  } catch (error) {
    console.log(error);
    res.render('404');
  } 
}




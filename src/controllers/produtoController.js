const session = require('express-session');
const Cadastro = require('../models/CadastroModel');

// renderiza a pagina de tela de adicao de itens
exports.paginaAdicao = (req, res) => {
    res.render('TelaAdicaoItens');
    return;
};

// renderiza a pagina de tela de remocao de itens
exports.paginaRemocao = (req, res) => {
    res.render('TelaRemocaoItens');
    return;
};

//Adiciona Produtos ao estoque
exports.addProduct = async (req, res) => {
  try {
    const add = new Cadastro(req.body);
    await add.addProduct();

    if(add.errors.length > 0){
      req.flash('errors', add.errors);
      req.session.save(function(){
      return res.redirect('/AdicionarItem');
      });
      return;
    }

    if(!add.produto){
      console.log(add.produto)
      req.flash('errors', add.errors);
      req.session.save(function(){
      return res.redirect('/AdicionarItem');
      });
      return;
    }

    req.flash('success', 'Quantidade adicionada ao estoque');
    req.session.save(function(){
    return res.redirect('/AdicionarItem');
    });
    
  } catch (error) {
    console.log(error);
    res.render('404');
  }
  
}

//Remove Produtos do estoque
exports.removeProduct = async (req, res) => {
  try {
    const remove = new Cadastro(req.body);
    await remove.removeProduct();

    if(remove.errors.length > 0){
      req.flash('errors', remove.errors);
      req.session.save(function(){
      return res.redirect('/RemoverItem');
      });
      return;
    }
    if(!remove.produto){
      req.flash('errors', remove.errors);
      req.session.save(function(){
      return res.redirect('/RemoverItem');
      });
      return;
    }
      req.flash('success', 'Quantidade Removida do estoque');
      req.session.save(function(){
      return res.redirect('/RemoverItem');
      });
    
  } catch (error) {
    console.log(error);
    res.render('404');
  }
  
}

//Resgata a Lista de produtos do banco
exports.getList = async (req, res) => {
    try {
      const listProduct = await Cadastro.getList();
      res.render('TelaListagemItens', {listProduct})
    } catch (error) {
      console.log(error);
      res.render('404');
    }
}
//Exclui o produto do banco
exports.excluirProduto = async (req, res) => {
  try {
    if(!req.params.id) return res.render('error');
    const product = await Cadastro.excluirProduto(req.params.id);
    if(!product) return res.render('error');

    req.flash('success', 'Produto excluido com sucesso');
    req.session.save(() => res.redirect('/ListarItem'));
    return;
  } catch (error) {
    console.log(error);
      res.render('404');
  }
}





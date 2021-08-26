const session = require('express-session');
const Cadastro = require('../models/CadastroModel');

//Resgata a Lista de cerveja do banco
exports.getListBeer = async (req, res) => {
    try {
      const listBeer = await Cadastro.getListBeer();
      res.render('shortcuts/TelaListaCervejas', {listBeer})
    } catch (error) {
      console.log(error);
      res.render('404');
    }
}
//Resgata a Lista de refrigerantes do banco
exports.getListSoda = async (req, res) => {
  try {
    const listSoda = await Cadastro.getListSoda();
    res.render('shortcuts/TelaListaRefrigerantes', {listSoda})
  } catch (error) {
    console.log(error);
    res.render('404');
  }
}
//Resgata a Lista de doces do banco
exports.getListCandy = async (req, res) => {
  try {
    const listCandy = await Cadastro.getListCandy();
    res.render('shortcuts/TelaListaDoces', {listCandy})
  } catch (error) {
    console.log(error);
    res.render('404');
  }
}
//Resgata a Lista de bebidas do banco
exports.getListDrink = async (req, res) => {
  try {
    const listDrink = await Cadastro.getListDrink();
    res.render('shortcuts/TelaListaBebidas', {listDrink})
  } catch (error) {
    console.log(error);
    res.render('404');
  }
}




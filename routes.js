const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');

// Rotas da home
route.get('/', homeController.paginaInicial);
route.post('/login', homeController.login);
route.get('/login/logoff', homeController.logoff);//finaliza a sessão

// Rotas de contato
route.get('/contato', contatoController.paginaInicial);


module.exports = route;

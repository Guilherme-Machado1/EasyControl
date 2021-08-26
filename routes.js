const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const cadastroController = require('./src/controllers/cadastroController');
const produtoController = require('./src/controllers/produtoController')
const filterController = require('./src/controllers/filterController');
const userController = require('./src/controllers/userController');
const instrucaoController = require('./src/controllers/instrucaoController');
const { permLogin } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.paginaInicial);
route.post('/login', homeController.login);
route.get('/login/logoff',  homeController.logoff);//finaliza a sessão
route.get('/telaInicial', permLogin, homeController.exibeTela);

// Rota de Cadastro de produto
route.get('/CadastrarItem', permLogin, cadastroController.paginaInicial);//Exibe a página inicial da tela Cadastro
route.post('/CadastrarItem/cadastro', cadastroController.cadastrar);

// Rota de controle de produto
route.get('/AdicionarItem', permLogin, produtoController.paginaAdicao);
route.post('/AdicionarItem/adicionado', produtoController.addProduct);
route.get('/RemoverItem', permLogin, produtoController.paginaRemocao);
route.post('/RemoverItem/Removido', produtoController.removeProduct);
route.get('/ListarItem', produtoController.getList);

route.get('/ListarCervejas', permLogin, filterController.getListBeer);
route.get('/ListarRefrigerantes', permLogin, filterController.getListSoda);
route.get('/ListarDoces', permLogin, filterController.getListCandy);
route.get('/ListarDrinks', permLogin, filterController.getListDrink);

// Cadastro de usuário
route.get('/cadastrarUsuario', permLogin, userController.paginaCadastroUser);
route.post('/cadastrarUsuario/novoUsuario', userController.cadastroUser);

// Deletar Produto
route.get('/ExcluirProduto/:id', permLogin, produtoController.excluirProduto);

// Rotas de contato
route.get('/instrucoes', instrucaoController.paginaInicial);


module.exports = route;

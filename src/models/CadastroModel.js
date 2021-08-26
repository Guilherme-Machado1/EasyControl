const mongoose = require('mongoose');
// const { container } = require('webpack');

const CadastroSchema = new mongoose.Schema({
  nome_produto: { type: String, required: true },
  quantidade: { type: Number, required: true },
  categoria: { type: String, required: false, default: '' },
  preco: { type: Number, required: false, default: Number(0) }
});

const CadastroModel = mongoose.model('Cadastro', CadastroSchema);

class Cadastro {
    constructor(body){
        this.body = body;
        this.produto = null;
        this.errors = [];
    }

    // Realiza o cadastro de um novo produto, caso o produto já exista, é retornado um erro
    async cadastrar(){
        try {
            this.cleanUp();
            this.produto = await CadastroModel.findOne({nome_produto: this.body.nome_produto})
            if(this.produto){
                this.errors.push('Não é possivel cadastrar 2 produtos com o mesmo nome');
                return;
            }
            this.produto = await CadastroModel.create(this.body);
            console.log(this.produto);
            if(!this.produto){
                this.errors.push('Não foi possível adicionar o novo produto');
                return;
            }
        } catch (error) {
            console.log(error);
            res.render('404');
        }
        
    }

    //Realiza a adicao de quantidade produto, caso o produto não exista, é retornado um erro
    async addProduct(){ 
        try {
            this.productExists();
            const filter = {nome_produto: this.body.nome_produto};
            this.produto = await CadastroModel.findOne(filter);
            if(!this.produto) return;
            const newQuant = {quantidade: this.produto.quantidade +  Number(this.body.quantidade)}
             this.produto = await CadastroModel.findOneAndUpdate(filter, newQuant, {new: true});
            if(!this.produto){
                this.errors.push('Não foi possível adicionar o novo produto');
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }
    //Realiza a remocao de quantidade produto, caso o produto não exista, é retornado um erro
    async removeProduct(){
        try {
            this.productExists();
            const filter = {nome_produto: this.body.nome_produto};
            this.produto = await CadastroModel.findOne(filter);
            if(!this.produto) return;
            const newQuant = {quantidade: this.produto.quantidade -  Number(this.body.quantidade)}
             this.produto = await CadastroModel.findOneAndUpdate(filter, newQuant, {new: true});
            if(!this.produto){
                this.errors.push('Não foi possível remover o novo produto');
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    // Verifica se o produto existe na base de dados.
    async productExists(){
        this.produto = await CadastroModel.findOne({nome_produto: this.body.nome_produto})
        if(!this.produto){
            this.errors.push('Produto não encontrado');
        }
        return;
    }

    
    // Atribui os dados vindos do form cadastro.
    cleanUp(){
          this.body = {
            nome_produto: this.body.nome_produto,
            quantidade: this.body.quantidade,
            categoria: this.body.categoria,
            preco: this.body.preco
        }
    }

} //Fim da classe


Cadastro.excluirProduto = async function(id){
    const product = await CadastroModel.findOneAndDelete({_id:id});
    return product;
}

// Busca todos os produtos do banco
Cadastro.getList = async function(){
    try {
        const listProduct = await CadastroModel.find().sort({ nome_produto: 'asc' });
        return listProduct;
    } catch (error) {
        console.log(error);
    }
    
}
// Busca todas as cervejas dados do banco
Cadastro.getListBeer = async function(){
    try {
        const listBeer = await CadastroModel.find({categoria: 'Cerveja'}).sort({ nome_produto: 'asc' });
        return listBeer;
    } catch (error) {
        console.log(error);
    }
    
}

// Busca todas os refrigerantes dados do banco
Cadastro.getListSoda = async function(){
    try {
        const listSoda = await CadastroModel.find({categoria: 'Refrigerante'}).sort({ nome_produto: 'asc' });
        return listSoda;
    } catch (error) {
        console.log(error);
    }
    
}

// Busca todas os doces do banco
Cadastro.getListCandy = async function(){
    try {
        const listCandy = await CadastroModel.find({categoria: 'Doces'}).sort({ nome_produto: 'asc' });
        return listCandy;
    } catch (error) {
        console.log(error);
    }
    
}

// Busca todas os doces do banco
Cadastro.getListDrink = async function(){
    try {
        const listDrink = await CadastroModel.find({categoria: 'Bebida'}).sort({ nome_produto: 'asc' });
        return listDrink;
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = Cadastro;

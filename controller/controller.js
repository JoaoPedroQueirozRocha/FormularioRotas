const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path');
const { use } = require('../routes/route');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static('public'))

exports.RespostaHTML = async(req, res, next) =>{
    try {
        res.render('index', {message:null, mensagem:null});
    } catch (error) {
        console.log(error)
    }
}

exports.PesquisarContato = async(req, res,next)=>{
    try {
        let username = req.query.username
        const cadastros = JSON.parse(await fs.readFileSync('models/dataBase.json'))
        const index = cadastros.users.findIndex(a => a.username == username)
        let message
        if (index == -1) {
            console.log('contato não listado')
            message = "contato não listado"
            res.render('index', {message:message, mensagem:null});
            res.end()
        }else if(username == null){
            console.log('Digite um nome a ser pesquisado')
            message = 'Digite o nome para pesquisa'
            res.render('index', {message:message, mensagem:null});
            res.end()
        }else{
            let user = cadastros.users.filter(a => a.username == username)
            res.render('users', {user:user, username:username})
            res.end()
        }
    } catch (error) {
        next(error)
    }
}
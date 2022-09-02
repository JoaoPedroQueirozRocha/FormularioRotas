const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
let http = require('http')
const route = require('./routes/route')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const expressLayouts = require('express-ejs-layouts')

app.use(express.json());
app.use('/', route);
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('public'))

app.post('/', async(req, res, next)=>{
    try {
        const username = req.body.username;
        const email = req.body.email;
        console.log(username)
        const users = JSON.parse(await fs.readFileSync('models/dataBase.json'));

        if(username == null || email == null){
            console.log('Campos não preenchidos')
            let mensagem = 'campos não preenchidos'
            res.render('index', {mensagem:mensagem, message:null});
            res.end()
        }else{
            user ={
                id: users.nextID++,
                username: username,
                email: email
            };
            users.users.push(user)
            await fs.writeFileSync('models/dataBase.json', JSON.stringify(users, null, 2))
            console.log("Contato adicionado com sucesso")
            res.render('index', {mensagem:null, message:null})
            res.end()
        }
    } catch (error) {
        next(error)
    }
})

app.listen(port, err =>{
    console.log(`http://localhost:${port}`)
})
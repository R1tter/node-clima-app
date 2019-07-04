const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Definição de paths para configuração do Express
const publicDiretoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup das Handlebars engine e localização da views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setando um diretório estático para o servidor
app.use(express.static(publicDiretoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Tempo app',
        nome: 'Marcelo Ritter'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'Sobre mim',
        nome:'Marcelo Ritter'
    })
})

app.get('/help', (req ,res) => {
    res.render('help',{
        title:'Como podemos ajudar?',
        helpText:'Deu ruim parceiro? Vem tranquilo que vai dar certo!',
        nome: 'Marcelo Ritter'
    })
})
app.get('/clima', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Você tem que preencher o campo de endereço!'
        })   
    } 

    geocode(req.query.address, (error, { latitude, longitude, location } = {})=>{
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'Você tem que escrever o termo search',

        })
    }

    console.log(req.query.search)
    res.send({
        produtos:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Marcelo Ritter',
        mensagemDeErro: 'Tópico não encontrado.'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        nome: 'Marcelo Ritter',
        mensagemDeErro: 'Página não encontrada.'
    })

    
})

app.listen(3000, () => {
    console.log('Servidor está up na porta 3000!')
})
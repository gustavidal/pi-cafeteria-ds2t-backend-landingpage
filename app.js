// Import das dependências para criar a API
const express = require('express')
const cors    = require('cors')

// Criando um objeto do express para criar a API
const app = express()

// Configurações do CORS da API
const corsOptions = {
    origin: ['*'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Authorization']
}

// Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))



// Import do arquivo de rotas da CATEGORIA
const categoriaRouter = require('./routes/categoria.router.js')
app.use('/v1/frequency80cafe/categoria/', cors(), categoriaRouter)

// Import do arquivo de rotas da IMAGEM
const imagemRouter = require('./routes/imagem.router.js')
app.use('/v1/frequency80cafe/imagem/', cors(), imagemRouter)

// Import do arquivo de rotas do PRODUTO
const produtoRouter = require('./routes/produto.router.js')
app.use('/v1/frequency80cafe/produto/', cors(), produtoRouter)



// Iniciar a API
app.listen(8090, function () {
    console.log('API aguardando novas requisições...')
})
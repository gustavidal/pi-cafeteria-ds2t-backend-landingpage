/*********************************************************************
 * Objetivo: Arquivo responsável pela organização de rotas do produto.
 * Autor: Gustavo Vidal de Abreu
 * Data: 11/06/2026 (quinta-feira)
 * Versão: 1.0
*********************************************************************/

// Import do express
const express = require('express')

// Import do body-parser
const bodyParser = require('body-parser')

// Permitindo a utilização do JSON na body das requisições
const bodyParserJSON = bodyParser.json()

// Criando um objeto de rota para os endpoints
const router = express.Router()

// Import do arquivo de verificação de token JWT
const autenticar = require('../middleware/auth.js')

// Import da controller de admin
const controllerProduto = require('../controller/produto/controller_produto.js')

/************************ENDPOINTS************************/
router.get('/', async function (request, response) {
    let result = await controllerProduto.listarProduto()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerProduto.buscarProduto(id)

    response.status(result.status_code)
    response.json(result)
})

// Export do objeto de rotas de gênero cênico
module.exports = router
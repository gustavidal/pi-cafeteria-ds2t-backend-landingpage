/***********************************************************************
 * Objetivo: Arquivo responsável pela organização de rotas da categoria.
 * Autor: Gustavo Vidal de Abreu
 * Data: 11/06/2026 (quinta-feira)
 * Versão: 1.0
***********************************************************************/

// Import do express
const express = require('express')

// Criando um objeto de rota para os endpoints
const router = express.Router()

// Import da controller de admin
const controllerCategoria = require('../controller/categoria/controller_categoria.js')

/************************ENDPOINTS************************/
router.get('/', async function (request, response) {
    let result = await controllerCategoria.listarCategoria()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerCategoria.buscarCategoria(id)

    response.status(result.status_code)
    response.json(result)
})

// Export do objeto de rotas de gênero cênico
module.exports = router
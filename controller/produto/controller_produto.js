/******************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD do produto.
 * Data: 11/06/2026 (quinta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
******************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const produtoDAO = require('../../model/DAO/produto/produto.js')

const controllerProdutoCategoria = require('./controller_produto_categoria.js')
const controllerImagem           = require('../imagem/controller_imagem.js')

const inserirNovoProduto = async function (produto, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(produto)

            if (validar) {
                return validar // status-code: 400
            } else {
                let result = await produtoDAO.insertProduto(produto)

                if (result) {
                    produto.id = result

                    for (let categoria of produto.categoria) {
                        let produtoCategoria = {
                            "id_produto": produto.id,
                            "id_categoria": categoria.id
                        }

                        let resultProdutoCategoria = await controllerProdutoCategoria.inserirNovoProdutoCategoria(produtoCategoria)

                        if (!resultProdutoCategoria.status) {
                            return customMessages.SUCCESS_CREATED_ITEM_WARNING // status-code: 201, porém com problema na inserção de alguns dados
                        }
                    }

                    customMessages.DEFAULT_MESSAGE.status      = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message     = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response    = produto

                    return customMessages.DEFAULT_MESSAGE // status-code: 201
                } else {
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                }
            }
        } else {
            return configMessages.ERROR_CONTENT_TYPE // status-code: 415
        }
    } catch (error) {
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const atualizarProduto = async function (produto, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let buscarProdutoResult = await buscarProduto(id)

            if (buscarProdutoResult.status) {
                let validar = await validarDados(produto)

                if (!validar) {
                    produto.id = Number(id)

                    let result = await produtoDAO.updateProduto(produto)

                    if (result) {
                        let resultDeleteCategorias = await controllerProdutoCategoria.excluirCategoriasIdProduto(produto.id)

                        if (resultDeleteCategorias.status) {
                            for (let categoria of produto.categoria) {
                                let produtoCategoria = {
                                    "id_produto": produto.id,
                                    "id_categoria": categoria.id
                                }

                                let resultProdutoCategoria = await controllerProdutoCategoria.inserirNovoProdutoCategoria(produtoCategoria)

                                if (!resultProdutoCategoria.status) {
                                    return customMessages.SUCCESS_CREATED_ITEM_WARNING // status-code: 201, porém com problema na inserção de alguns dados
                                }
                            }
                        }

                        customMessages.DEFAULT_MESSAGE.status      = customMessages.SUCCESS_UPDATED_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message     = customMessages.SUCCESS_UPDATED_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response    = produto

                        return customMessages.DEFAULT_MESSAGE // status-code: 200
                    } else {
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                    }
                } else {
                    return validar // status-code: 400 (atributo)
                }
            } else {
                return buscarProdutoResult // status-code: 400 (id) ou 404
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE // status-code: 415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const listarProduto = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await produtoDAO.selectAllProduto()

        if (result) {
            if (result.length > 0) {
                for (let produto of result) {
                    let resultCategoria = await controllerProdutoCategoria.buscarCategoriasIdProduto(produto.id)

                    if (resultCategoria.status) {
                        produto.categoria = resultCategoria.response.categorias_produto
                    }

                    let resultImagem = await controllerImagem.buscarImagensIdProduto(produto.id)

                    if (resultImagem.status) {
                        produto.imagem = resultImagem.response.imagens_produto
                    }
                }

                customMessages.DEFAULT_MESSAGE.status            = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code       = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count    = result.length
                customMessages.DEFAULT_MESSAGE.response.produtos = result

                return customMessages.DEFAULT_MESSAGE // status-code: 200
            } else {
                return customMessages.ERROR_NOT_FOUND // status-code: 404
            }
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const buscarProduto = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await produtoDAO.selectByIdProduto(id)

            if (result) {
                if (result.length > 0) {
                    for (let produto of result) {
                        let resultCategoria = await controllerProdutoCategoria.buscarCategoriasIdProduto(produto.id)

                        if (resultCategoria.status) {
                            result[0].categoria = resultCategoria.response.categorias_produto
                        }

                        let resultImagem = await controllerImagem.buscarImagensIdProduto(produto.id)

                        if (resultImagem.status) {
                            result[0].imagem = resultImagem.response.imagens_produto
                        }
                    }

                    customMessages.DEFAULT_MESSAGE.status           = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code      = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.produto = result

                    return customMessages.DEFAULT_MESSAGE // status-code: 200
                } else {
                    return customMessages.ERROR_NOT_FOUND // status-code: 404
                }
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const excluirProduto = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarProdutoResult = await buscarProduto(id)

        if (buscarProdutoResult.status) {
            let result = await produtoDAO.deleteProduto(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarProdutoResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const validarDados = async function (produto) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (produto.nome == undefined || produto.nome == '' || produto.nome == null || produto.nome.length > 100) {
        customMessages.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDA'
    } else if (produto.descricao == undefined || produto.descricao == '' || produto.descricao == null || produto.descricao.length > 255) {
        customMessages.ERROR_BAD_REQUEST.field = '[DESCRIÇÃO] INVÁLIDA'
    } else if (produto.preco == undefined || produto.preco == '' || produto.preco == null || isNaN(produto.preco) || produto.preco < 0 || produto.preco > 999.99) {
        customMessages.ERROR_BAD_REQUEST.field = '[PREÇO] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoProduto,
    atualizarProduto,
    listarProduto,
    buscarProduto,
    excluirProduto
}
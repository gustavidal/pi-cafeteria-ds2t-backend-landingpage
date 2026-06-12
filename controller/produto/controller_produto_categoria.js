/********************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de relação entre produto e categoria.
 * Data: 11/06/2026 (quinta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
********************************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const produtoCategoriaDAO = require('../../model/DAO/produto_categoria/produto_categoria.js')

const inserirNovoProdutoCategoria = async function (produtoCategoria) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let validar = await validarDados(produtoCategoria)

        if (validar) {
            return validar // status-code: 400
        } else {
            let result = await produtoCategoriaDAO.insertProdutoCategoria(produtoCategoria)

            if (result) {
                produtoCategoria.id = result

                customMessages.DEFAULT_MESSAGE.status      = customMessages.SUCCESS_CREATED_ITEM.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                customMessages.DEFAULT_MESSAGE.message     = customMessages.SUCCESS_CREATED_ITEM.message
                customMessages.DEFAULT_MESSAGE.response    = produtoCategoria

                return customMessages.DEFAULT_MESSAGE // status-code: 201
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        }
    } catch (error) {
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const atualizarProdutoCategoria = async function (produtoCategoria, id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarProdutoCategoriaResult = await buscarProdutoCategoria(id)

        if (buscarProdutoCategoriaResult.status) {
            let validar = await validarDados(produtoCategoria)

            if (!validar) {
                produtoCategoria.id = Number(id)

                let result = await produtoCategoriaDAO.updateProdutoCategoria(produtoCategoria)

                if (result) {
                    customMessages.DEFAULT_MESSAGE.status      = customMessages.SUCCESS_UPDATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message     = customMessages.SUCCESS_UPDATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response    = produtoCategoria

                    return customMessages.DEFAULT_MESSAGE // status-code: 200
                } else {
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                }
            } else {
                return validar // status-code: 400 (atributo)
            }
        } else {
            return buscarProdutoCategoriaResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const listarProdutoCategoria = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await produtoCategoriaDAO.selectAllProdutoCategoria()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status                      = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code                 = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count              = result.length
                customMessages.DEFAULT_MESSAGE.response.produto_categorias = result

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

const buscarProdutoCategoria = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await produtoCategoriaDAO.selectByIdProdutoCategoria(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                     = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code                = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.produto_categoria = result

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

const buscarCategoriasIdProduto = async function (idProduto) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idProduto == undefined || String(idProduto).replaceAll(' ', '') == '' || idProduto == null || isNaN(idProduto) || idProduto < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DO PRODUTO] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await produtoCategoriaDAO.selectCategoriasByIdProduto(idProduto)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                      = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code                 = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.categorias_produto = result

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

const buscarProdutosIdCategoria = async function (idCategoria) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idCategoria == undefined || String(idCategoria).replaceAll(' ', '') == '' || idCategoria == null || isNaN(idCategoria) || idCategoria < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DA CATEGORIA] INVÁLIDA'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await produtoCategoriaDAO.selectProdutosByIdCategoria(idCategoria)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                      = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code                 = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.produtos_categoria = result

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

const excluirProdutoCategoria = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarProdutoCategoriaResult = await buscarProdutoCategoria(id)

        if (buscarProdutoCategoriaResult.status) {
            let result = await produtoCategoriaDAO.deleteProdutoCategoria(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarProdutoCategoriaResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const excluirCategoriasIdProduto = async function (idProduto) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await produtoCategoriaDAO.deleteCategoriasByIdProduto(idProduto)

        if (result) {
            return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
        }

    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const validarDados = async function (produtoCategoria) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (produtoCategoria.id_produto == undefined || produtoCategoria.id_produto == '' || produtoCategoria.id_produto == null || isNaN(produtoCategoria.id_produto) || produtoCategoria.id_produto < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DO PRODUTO] INVÁLIDO'
    } else if (produtoCategoria.id_categoria == undefined || produtoCategoria.id_categoria == '' || produtoCategoria.id_categoria == null || isNaN(produtoCategoria.id_categoria) || produtoCategoria.id_categoria < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DA CATEGORIA] INVÁLIDA'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoProdutoCategoria,
    atualizarProdutoCategoria,
    listarProdutoCategoria,
    buscarProdutoCategoria,
    buscarCategoriasIdProduto,
    buscarProdutosIdCategoria,
    excluirProdutoCategoria,
    excluirCategoriasIdProduto
}
/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD da categoria.
 * Data: 11/06/2026 (quinta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
********************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const categoriaDAO = require('../../model/DAO/categoria/categoria.js')

const inserirNovaCategoria = async function (categoria, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(categoria)

            if (validar) {
                return validar // status-code: 400
            } else {
                let result = await categoriaDAO.insertCategoria(categoria)

                if (result) {
                    categoria.id = result

                    customMessages.DEFAULT_MESSAGE.status      = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message     = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response    = categoria

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

const atualizarCategoria = async function (categoria, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let buscarCategoriaResult = await buscarCategoria(id)

            if (buscarCategoriaResult.status) {
                let validar = await validarDados(categoria)

                if (!validar) {
                    categoria.id = Number(id)

                    let result = await categoriaDAO.updateCategoria(categoria)

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status      = customMessages.SUCCESS_UPDATED_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message     = customMessages.SUCCESS_UPDATED_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response    = categoria

                        return customMessages.DEFAULT_MESSAGE // status-code: 200
                    } else {
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                    }
                } else {
                    return validar // status-code: 400 (atributo)
                }
            } else {
                return buscarCategoriaResult // status-code: 400 (id) ou 404
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE // status-code: 415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const listarCategoria = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await categoriaDAO.selectAllCategoria()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status              = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code         = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count      = result.length
                customMessages.DEFAULT_MESSAGE.response.categorias = result

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

const buscarCategoria = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await categoriaDAO.selectByIdCategoria(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status             = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code        = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.categoria = result

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

const excluirCategoria = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarCategoriaResult = await buscarCategoria(id)

        if (buscarCategoriaResult.status) {
            let result = await categoriaDAO.deleteCategoria(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarCategoriaResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const validarDados = async function (categoria) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (categoria.categoria == undefined || categoria.categoria == '' || categoria.categoria == null || categoria.categoria.length > 40) {
        customMessages.ERROR_BAD_REQUEST.field = '[CATEGORIA] INVÁLIDA'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovaCategoria,
    atualizarCategoria,
    listarCategoria,
    buscarCategoria,
    excluirCategoria
}
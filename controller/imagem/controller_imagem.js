/*****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD da imagem.
 * Data: 11/06/2026 (quinta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*****************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const imagemDAO = require('../../model/DAO/imagem/imagem.js')

const inserirNovaImagem = async function (imagem, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(imagem)

            if (validar) {
                return validar // status-code: 400
            } else {
                let result = await imagemDAO.insertImagem(imagem)

                if (result) {
                    imagem.id = result

                    customMessages.DEFAULT_MESSAGE.status      = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message     = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response    = imagem

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

const atualizarImagem = async function (imagem, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let buscarImagemResult = await buscarImagem(id)

            if (buscarImagemResult.status) {
                let validar = await validarDados(imagem)

                if (!validar) {
                    imagem.id = Number(id)

                    let result = await imagemDAO.updateImagem(imagem)

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status      = customMessages.SUCCESS_UPDATED_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message     = customMessages.SUCCESS_UPDATED_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response    = imagem

                        return customMessages.DEFAULT_MESSAGE // status-code: 200
                    } else {
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                    }
                } else {
                    return validar // status-code: 400 (atributo)
                }
            } else {
                return buscarImagemResult // status-code: 400 (id) ou 404
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE // status-code: 415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const listarImagem = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await imagemDAO.selectAllImagem()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status           = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code      = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count   = result.length
                customMessages.DEFAULT_MESSAGE.response.imagens = result

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

const buscarImagem = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await imagemDAO.selectByIdImagem(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status          = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code     = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.imagem = result

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

const buscarImagensIdProduto = async function (idProduto) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idProduto == undefined || String(idProduto).replaceAll(' ', '') == '' || idProduto == null || isNaN(idProduto) || idProduto < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DO PRODUTO] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await imagemDAO.selectImagensByIdProduto(idProduto)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status                   = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code              = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.imagens_produto = result

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

const excluirImagem = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarImagemResult = await buscarImagem(id)

        if (buscarImagemResult.status) {
            let result = await imagemDAO.deleteImagem(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarImagemResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const validarDados = async function (imagem) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (imagem.url == undefined || imagem.url == '' || imagem.url == null || imagem.url.length > 255) {
        customMessages.ERROR_BAD_REQUEST.field = '[URL] INVÁLIDA'
    } else if (imagem.id_produto == undefined || imagem.id_produto == '' || imagem.id_produto == null || imagem.id_produto < 1 || isNaN(imagem.id_produto)) {
        customMessages.ERROR_BAD_REQUEST.field = '[URL] INVÁLIDA'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovaImagem,
    atualizarImagem,
    listarImagem,
    buscarImagem,
    buscarImagensIdProduto,
    excluirImagem
}
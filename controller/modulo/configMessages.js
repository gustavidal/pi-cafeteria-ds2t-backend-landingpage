/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela padronização das mensagens e status code do projeto Frequency 80 Cafe.
 * Data: 08/06/2026 (segunda-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
***********************************************************************************************************/

// Padronização dos retornos da API (cabeçalho)
const DEFAULT_MESSAGE = {
    "api_description": "API destinada ao controle de produtos da cafeteria temática Frequency 80 Cafe (Landing Page).",
    "development": "Gustavo Vidal de Abreu",
    "version": "1.0.6.26",
    "status": Boolean,
    "status_code": Number,
    "response": {}
}

// Mensagens de ERRO do projeto Frequency 80 Cafe
const ERROR_BAD_REQUEST                = { "status": false, "status_code": 400, "message": "Não foi possível processar a requisição devido a erros de entrada de dados." }
const ERROR_NOT_FOUND                  = { "status": false, "status_code": 404, "message": "Não foi possível encontrar dados para retorno." }
const ERROR_CONTENT_TYPE               = { "status": false, "status_code": 415, "message": "Não foi possível processar a requisição devido ao formato de dados encaminhado não ser suportado pelo servidor. Deve ser utilizado apenas o formato JSON." }
const ERROR_INTERNAL_SERVER_CONTROLLER = { "status": false, "status_code": 500, "message": "Não foi possível processar a requisição devido a um erro interno do servidor [CONTROLLER]." }
const ERROR_INTERNAL_SERVER_MODEL      = { "status": false, "status_code": 500, "message": "Não foi possível processar a requisição devido a um erro interno do servidor [MODEL]." }

// Mensagens de SUCESSO do projeto Frequency 80 Cafe
const SUCCESS_RESPONSE             = { "status": true, "status_code": 200, "message": "Requisição processada com sucesso." }
const SUCCESS_UPDATED_ITEM         = { "status": true, "status_code": 200, "message": "Item atualizado com sucesso." }
const SUCCESS_DELETED_ITEM         = { "status": true, "status_code": 200, "message": "Item excluído com sucesso." }
const SUCCESS_CREATED_ITEM         = { "status": true, "status_code": 201, "message": "Item inserido com sucesso." }
const SUCCESS_CREATED_ITEM_WARNING = { "status": true, "status_code": 201, "message": "Item inserido com sucesso, porém alguns dados complementares não puderam ser processados." }

module.exports = {
    // Default
    DEFAULT_MESSAGE,

    // Error
    ERROR_BAD_REQUEST,
    ERROR_UNAUTHORIZED,
    ERROR_NOT_FOUND,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,

    // Success
    SUCCESS_RESPONSE,
    SUCCESS_UPDATED_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_CREATED_ITEM,
    SUCCESS_CREATED_ITEM_WARNING
}
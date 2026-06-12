/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de imagem no banco de dados MySQL.
 * Autor: Gustavo Vidal de Abreu
 * Data: 11/06/2026 (quinta-feira)
 * Versão: 1.0
*************************************************************************************/

const knex = require('knex')
const knexDatabaseConfig = require('../../database_config/knexConfig.js')
const knexConnection = knex(knexDatabaseConfig.development)

const insertProduto = async function (produto) {
    try {
        let sql = `
            insert into tbl_produto (
                nome,
                descricao,
                preco
            ) values (
                replace('${produto.nome}', "'", ""),
                replace('${produto.descricao}', "'", ""),
                replace('${produto.preco}', "'", "")
            );
        `

        let result = await knexConnection.raw(sql)

        if (result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}

const updateProduto = async function (produto) {
    try {
        let sql = `
            update tbl_produto set
                nome      = replace('${produto.nome}', "'", ""),
                descricao = replace('${produto.descricao}', "'", ""),
                preco     = replace('${produto.preco}', "'", "")
            where id = ${produto.id};
        `

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllProduto = async function () {
    try {
        let sql = `
            select * from tbl_produto order by id desc;
        `

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdProduto = async function (id) {
    try {
        let sql = `
            select * from tbl_produto where id = ${id};
        `

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteProduto = async function (id) {
    try {
        let sql = `delete from tbl_produto where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertProduto,
    updateProduto,
    selectAllProduto,
    selectByIdProduto,
    deleteProduto
}
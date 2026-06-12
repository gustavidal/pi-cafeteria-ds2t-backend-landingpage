/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de imagem no banco de dados MySQL.
 * Autor: Gustavo Vidal de Abreu
 * Data: 11/06/2026 (quinta-feira)
 * Versão: 1.0
*************************************************************************************/

const knex = require('knex')
const knexDatabaseConfig = require('../../database_config/knexConfig.js')
const knexConnection = knex(knexDatabaseConfig.development)

const insertImagem = async function (imagem) {
    try {
        let sql = `
            insert into tbl_imagem (
                url,
                id_produto
            ) values (
                replace('${imagem.url}', "'", ""),
                ${imagem.id_produto}
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

const updateImagem = async function (imagem) {
    try {
        let sql = `
            update tbl_imagem set
                url        = replace('${imagem.url}', "'", ""),
                id_produto = ${imagem.id_produto}
            where id = ${imagem.id};
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

const selectAllImagem = async function () {
    try {
        let sql = `
            select * from tbl_imagem order by id desc;
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

const selectByIdImagem = async function (id) {
    try {
        let sql = `
            select * from tbl_imagem where id = ${id};
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

const selectImagensByIdProduto = async function (idProduto) {
    try {
        let sql = `
        select tbl_imagem.id, tbl_imagem.url
        from tbl_produto
            inner join tbl_imagem
                on tbl_produto.id = tbl_imagem.id_produto
        where tbl_produto.id = ${idProduto};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteImagem = async function (id) {
    try {
        let sql = `delete from tbl_imagem where id = ${id};`

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
    insertImagem,
    updateImagem,
    selectAllImagem,
    selectByIdImagem,
    selectImagensByIdProduto,
    deleteImagem
}
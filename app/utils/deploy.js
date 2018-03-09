'use strict';
const {createMysqlWidget,insertMysqlWidget,createOracleWidget,deleteOnExistOracle,insertOracleWidget}= require('./const');
const mysql = require('mysql2/promise');
const mysql2 = require('mysql2');
const oracledb = require('oracledb');

function getNow() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDay()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
}

async function mysqlDeploy(deployData = [], dbOption, logger) {
    const {createTable, ...option} = dbOption;
    let  connection ;

    //create table
    try {
        connection= await mysql.createConnection({multipleStatements: true, ...option});
        if (createTable) {
            await connection.query(createMysqlWidget);
            logger.info('create new table success')
        }
        const queryString = deployData.map(el => (mysql2.format(insertMysqlWidget, [
            el._id,
            el.name || '',
            el.author || '',
            el.thumbnail || '',
            getNow(),
            el.script,
            JSON.stringify(el.rawOption),
            JSON.stringify(el.data),
            JSON.stringify(el.dataOption)]))).reduce((a, b) => a + b);
        await connection.query(queryString)
        logger.info('deploy to mysql success');
    }
    catch (error) {
        logger.error('deploy to mysql failed.\r\ndbOption: %j.\r\nreason:%s', dbOption, error);
        throw error;
    }finally {
        connection&&connection.end();
    }
};

async function oracleDeploy(deployData = [], dbOption, logger) {
    const {host,serviceName,createTable, ...options} = dbOption;
    const connectString = `${host}/${serviceName}`;
    let connection;
    try {
        connection = await oracledb.getConnection({...options,externalAuth:false, connectString});
        if (createTable) {
            await connection.execute(deleteOnExistOracle);
            await connection.execute(createOracleWidget);
            logger.info('create new table success')
        }
        //执行删除
        const idList=deployData.map(el=>el._id);
        let deleteSql = "delete YDP_VISUAL_INSTANCE where id in (";
        for (let i=0; i < idList.length; i++)
            deleteSql += (i > 0) ? ", :" + i : ":" + i;
        deleteSql += ")";
        const deleteResult=await connection.execute(deleteSql,idList,{autoCommit:false});
        logger.info('delete row %d',deleteResult.rowsAffected);

        //循环执行
        for(let index=0;index<deployData.length;index++){
            let el=deployData[index];
            await  connection.execute(insertOracleWidget,[
            el._id,
            el.name || '',
            el.author || '',
            el.thumbnail || '',
            new Date(),
            el.script,
            JSON.stringify(el.rawOption),
            JSON.stringify(el.data),
            JSON.stringify(el.dataOption)],{autoCommit:index===deployData.length-1})
        }
        logger.info('deploy to oracle Db success')
    } catch (error) {
        logger.error('deploy to oracle Db \r\ndbOption: %j.\r\nerror: %s', dbOption, error);
        connection&&connection.rollback();
        throw error;
    }finally {
        connection&&connection.close();
    }
}


exports.deployWidget=function (type, data, dbOption, logger) {
    switch (type) {
        case 'mysql':
            return mysqlDeploy(data, dbOption, logger);
        case 'oracle':
            return oracleDeploy(data, dbOption, logger)
        case 'sqlServer':
            break;
        default:
            return null;
    }
}


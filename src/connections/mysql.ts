import * as mysql from 'mysql2/promise';
import { connect } from 'http2';
import { query } from 'express';

let mysqlConfig: Object = {
    user: "root",
    password: "password2$",
    database: "feedsdatabase",
    host: "localhost"
}
let connection: any;
let createConnection = async() => {
    connection = await mysql.createConnection(mysqlConfig);
}

export let executeQuery = async (query: String) => {
    let result = await connection.query(query);
    return result[0];
}
createConnection();

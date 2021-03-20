"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = void 0;
const mysql = require("mysql2/promise");
let mysqlConfig = {
    user: "root",
    password: "password2$",
    database: "feedsdatabase",
    host: "localhost"
};
let connection;
let createConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield mysql.createConnection(mysqlConfig);
});
let executeQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield connection.query(query);
    return result[0];
});
exports.executeQuery = executeQuery;
createConnection();
//# sourceMappingURL=mysql.js.map
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
exports.getFeedsListing = void 0;
const mysql_1 = require("../connections/mysql");
let getFeedsListing = (condition, sort, start, end) => __awaiter(void 0, void 0, void 0, function* () {
    let queryString = `select * from feeds`;
    if (condition) {
        queryString = `${queryString} where ${condition}`;
    }
    if (sort) {
        queryString = `${queryString} order by dateLastEdited ${sort}`;
    }
    start = start ? start : "0";
    if (start && end) {
        queryString = `${queryString} limit ${start}, ${end}`;
    }
    console.log('query is...............', queryString);
    let result = yield mysql_1.executeQuery(queryString);
    return result;
});
exports.getFeedsListing = getFeedsListing;
//# sourceMappingURL=getfeeds.js.map
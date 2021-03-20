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
exports.getFeeds = void 0;
const getfeeds_1 = require("../models/getfeeds");
let getFeeds = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(request.query);
    let conditionString = request.query.searchterm;
    let positions = [];
    let strictCheckArray = [];
    let nonStrictString = conditionString;
    let nonStrictCheckArray = [];
    let conditionArray = [];
    let sortingOrder = request.query.sort;
    let startLimit = request.query.start;
    let endLimit = request.query.end;
    console.log(conditionString);
    let allConditionsArray = [];
    for (let i = 0; i < conditionString.length; i++) {
        if (conditionString[i] === '"') {
            positions.push(i);
        }
    }
    for (let i = 0; i < conditionString.length; i += 2) {
        if (positions[i] && positions[1]) {
            nonStrictString = nonStrictString.replace(conditionString.slice(positions[i], positions[i + 1]), '').replace(/"/g, '');
            strictCheckArray.push(conditionString.slice(positions[i], positions[i + 1]).replace(/"/g, ''));
        }
    }
    console.log('strict check array is.............', strictCheckArray);
    console.log('non strict string is...........', nonStrictString);
    nonStrictCheckArray = nonStrictString.split(' ');
    conditionArray = strictCheckArray.concat(nonStrictCheckArray);
    console.log(positions);
    for (let iterator of conditionArray) {
        allConditionsArray.push(`(name LIKE '%${iterator}%' OR description LIKE '%${iterator}%')`);
    }
    console.log('All condition Array is.....', allConditionsArray);
    let result = yield getfeeds_1.getFeedsListing(allConditionsArray.join(' OR '), sortingOrder, startLimit, endLimit);
    response.send(result);
});
exports.getFeeds = getFeeds;
//# sourceMappingURL=feedslisting.js.map
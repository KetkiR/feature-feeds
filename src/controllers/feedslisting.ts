import { Request, Response, response } from 'express';
import { request } from 'http';
import { getFeedsListing } from '../models/getfeeds';

export let getFeeds = async (request: { query: any; }, response: { send: (arg0: any) => void; }) => {
    console.log(request.query);
    let conditionString: string = request.query.searchterm;
    
    let positions = [];
    let strictCheckArray = [];
    let nonStrictString: string = conditionString;
    let nonStrictCheckArray: Array<string> = []
    let conditionArray: Array<string> = [];
    let sortingOrder: string = request.query.sort;
    let startLimit: string = request.query.start;
    let endLimit: string = request.query.end; 
    console.log(conditionString);
    let allConditionsArray: Array<string> = [];
    for(let i : number = 0; i < conditionString.length; i++) {
        if(conditionString[i] === '"') {
            positions.push(i);
        }
    }
    for(let i : number = 0; i < conditionString.length; i+=2) {
        if(positions[i] && positions[1]) {
            nonStrictString = nonStrictString.replace(conditionString.slice(positions[i], positions[i+1]), '').replace(/"/g, '')
            strictCheckArray.push(conditionString.slice(positions[i], positions[i+1]).replace(/"/g, ''))
        }
    }
    console.log('strict check array is.............',strictCheckArray)
    console.log('non strict string is...........', nonStrictString);
    nonStrictCheckArray = nonStrictString.split(' ');
    conditionArray = strictCheckArray.concat(nonStrictCheckArray);
    
    console.log(positions);

    for (let iterator of conditionArray) {
        allConditionsArray.push(`(name LIKE '%${iterator}%' OR description LIKE '%${iterator}%')`);
    }
    console.log('All condition Array is.....', allConditionsArray);
    let result = await getFeedsListing(allConditionsArray.join(' OR '),sortingOrder,startLimit,endLimit);
    response.send(result);
}
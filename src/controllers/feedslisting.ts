import { Request, Response, response } from 'express';
import { request } from 'http';
import { getFeedsListing, getTotalFeeds } from '../models/getfeeds';

export let getFeeds = async (request: { query: any; }, response:any) => {
    
    console.log(request.query);
    let conditionString: string = request.query.searchterm;
    
    let positions = []; // store positions of "" in a string which are used for strict string check
    let strictCheckArray = []; // array of strings to perform exact string matches
    let nonStrictString: string = conditionString;
    let nonStrictCheckArray: Array<string> = []
    let conditionArray: Array<string> = [];
    let sortingOrder: string = request.query.sort; // sorting order
    let startLimit: string = request.query.start; // to perform data pagination start index
    let endLimit: string = request.query.end; // to perform data pagination end index
    let allConditionsArray: Array<string> = [];
    // condition to check if the start and end parameters from request are numbers only and also the sorting order input is asc or desc order
    if((!(/^\d+$/.test(startLimit)) || !(/^\d+$/.test(endLimit)) && (sortingOrder != 'asc' && sortingOrder != 'desc'))) {
        response.status(400).send({message: 'Invalid request!!!'});
    } else {
        // loop to check the index of "" in a string
        for(let i : number = 0; i < conditionString.length; i++) {
            if(conditionString[i] === '"') {
                positions.push(i);
            }
        }
        // loop to seperate out exact match strings and non exact match strings by splicing the string by positions of " in input string
        for(let i : number = 0; i < conditionString.length; i+=2) {
            if(positions[i] >= 0 && positions[i+1]) {
                nonStrictString = nonStrictString.replace(conditionString.slice(positions[i], positions[i+1]), '').replace(/"/g, '')
                strictCheckArray.push(conditionString.slice(positions[i], positions[i+1]).replace(/"/g, ''))
            }
        }
        // converting non strict string into array eg => 'ketki randhir' => nonStrictCheckArray = ['ketki', 'randhir']
        nonStrictCheckArray = nonStrictString.split(' ');
        conditionArray = strictCheckArray.concat(nonStrictCheckArray); // merging the array of strict and non strict check strings
            
        // loop to form search query
        for (let iterator of conditionArray) {
            if(iterator) {
                allConditionsArray.push(`(name LIKE '%${iterator.replace(/'/g, "\\'")}%' OR description LIKE '%${iterator.replace(/'/g, "\\'")}%')`);
            }
           
        }
        
        let result = await getFeedsListing(allConditionsArray.join(' OR '),sortingOrder,startLimit,endLimit);
        let totalFeeds = await getTotalFeeds(allConditionsArray.join(' OR '));
        response.send({feeds: result, total: totalFeeds });
    }
  
}
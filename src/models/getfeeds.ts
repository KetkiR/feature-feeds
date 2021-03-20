import { executeQuery } from '../connections/mysql';

export let getFeedsListing = async (condition: String, sort: String, start: String, end: String) => {
    
    let queryString = `select * from feeds`;
    if(condition) {
        queryString = `${queryString} where ${condition}`;
    }
    if(sort) {
        queryString = `${queryString} order by dateLastEdited ${sort}`;
    }
    start = start ? start : "0";
    if(start && end) {
        queryString = `${queryString} limit ${start}, ${end}`;
    }
    console.log('query is...............', queryString);
    let result = await executeQuery(queryString);
    return result;
}
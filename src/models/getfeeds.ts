import { executeQuery } from '../connections/mysql';

// function to get filtered query data for a particular search
export let getFeedsListing = async (condition: String, sort: String, start: String, end: String) => {
    
    let queryString: string = `select name, description,image, dateLastEdited from feeds`;
    if(condition) {
        queryString = `${queryString} where (${condition})`;
    }
    if(sort) {
        queryString = `${queryString} order by dateLastEdited ${sort}`;
    }
    start = start ? start : "0";
    if(start && end) {
        queryString = `${queryString} limit ${start}, ${end}`;
    }
    let result = await executeQuery(queryString);
    return result;
}

// function to get total number of results for a particular search
export let getTotalFeeds = async (condition: String) => {
    let queryString: string = `select count(*) as total from feeds`;
    if(condition) {
        queryString = `${queryString} where ${condition}`;
    }
    let result = await executeQuery(queryString);
    return result;
}
const asyncHandler = require("express-async-handler");

const searchHelper = (searchKey,query,req) =>{

    if(req.query.search){
        const searchObject = {};
    
        const regex = new RegExp(req.query.search,"i");
        searchObject[searchKey] = regex;
    
        return query.where(searchObject); 
    }

    return query;

}

const populateHelper = (query,population) =>
{

return query.populate(population);
 
}

const questionSortHelper = (query,req) =>{

    const sortKey = req.query.sortBy;

if(sortKey === "mostLiked")
{
    return query.sort("-likesCount -createdAt");
}
else{
if(sortKey === "mostReplied")
{
    return query.sort("-repliesCount -createdAt");
}
else
{
    return query.sort("-createdAt");
}
}
}

const paginationHelper = asyncHandler(async (total,req,query) =>{

 const page = parseInt(req.query.page) || 1;

 const limit = parseInt(req.query.limit) || 2;

 const startIndex = (page - 1)*limit; 

 const endIndex = page * limit;

 const pagination = {};

 if(startIndex > 0)
 {
    pagination.previous = {
        page : page-1,
        limit: limit

    }
 }

 else if(endIndex < total)
 {
     pagination.next = {
     page: page+1,
     limit: limit
 }
}

else{
    pagination.next = {
        page: 1,
        limit: 2
    }

}
console.log(pagination);
 return {
     query : query === undefined ? undefined : query.skip(startIndex).limit(limit),
     pagination: pagination
 }
 

});

module.exports = {searchHelper,populateHelper,questionSortHelper,paginationHelper}
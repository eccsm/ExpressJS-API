const {searchHelper,populateHelper,questionSortHelper,paginationHelper} = require("./queryHelper");

const asyncHandler = require("express-async-handler");

const questionQuery = function (model,options) {

    return asyncHandler (async function (req,res,next){

        let query = model.find();

        query = searchHelper("title",query,req);

        if(options && options.population)
        {
            query = populateHelper(query,options.population);
        }

        query = questionSortHelper(query,req);

        const total = await model.countDocuments();
        
        const paginate = await paginationHelper(total,req,query);


        query = paginate.query;

        pagination = paginate.pagination;

        const queryResults = await query;

        res.queryResults = {
            success: true,
            count: queryResults.length,
            pagination:pagination,
            data: queryResults

        }

        next();

    });

}

module.exports = questionQuery;
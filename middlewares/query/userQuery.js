const {searchHelper,paginationHelper} = require("./queryHelper");

const asyncHandler = require("express-async-handler");

const userQuery = function (model) {

    return asyncHandler (async function (req,res,next){

        let query = model.find();

        query = searchHelper("name",query,req);

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

module.exports = userQuery;
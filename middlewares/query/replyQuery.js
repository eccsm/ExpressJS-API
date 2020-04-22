const {populateHelper,paginationHelper} = require("./queryHelper");

const asyncHandler = require("express-async-handler");

const replyQuery = function (model,options) {

    return asyncHandler (async function (req,res,next){


        const {id} = req.params;

        const arrayName = "replies";

        const total = ( await model.findById(id))["repliesCount"];

        const paginate = await paginationHelper(total,req,undefined);

        let page,limit;

        if(paginate.pagination.next)
        {
             page = paginate.pagination.next.page;

             limit = paginate.pagination.next.limit;


        }
        else
        {
             page = paginate.pagination.previous.page;

             limit = paginate.pagination.previous.limit;


        }

        const startIndex = (page - 1)*limit; 

        let qObject = {};

        qObject[arrayName] = {$slice : [startIndex,limit]};

        let query = model.find({  _id : id},qObject);

        query = populateHelper(query,options.population)

        const queryResults = await query;

        res.queryResults = {
            success: true,
            pagination:paginate.pagination,
            data: queryResults

        }
        

        next();

    });

}

module.exports = replyQuery;
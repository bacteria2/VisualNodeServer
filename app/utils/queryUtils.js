function handleQueryParams(queryObject){
    delete queryObject.page
    delete queryObject.pageSize
    Object.keys(queryObject).forEach(key => {
        if(!queryObject[key]){
            delete queryObject[key]
        }
    } )
    if(queryObject.name){
        //like %name% 并且 不区分大小写
        queryObject.name = {$regex:queryObject.name,$options:"$i"}
    }
}

async function handlePaginationQuery({queryObject={},collection,project={},sort={}}){
    const {page = 1,pageSize =7} = queryObject,skip = (page - 1) * pageSize
    handleQueryParams(queryObject)
    let cursor = collection.find(queryObject), total = await cursor.count(),
        list = await cursor.project(project)
        .sort(sort)
        .skip(skip)
        .limit(pageSize*1).toArray()
    return {total,list};
}

module.exports={handleQueryParams,handlePaginationQuery}
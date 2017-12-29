const development={
    apiPrefix:"/visual/",
    port:8033, 
    proxyTable: {},
    mongodbUrl:"mongodb://192.168.40.161:27017",
    dbName:'data-view',
    connectConfig:{
        poolSize: 10,
    }
}

const production={
    apiPrefix:"/visual/",
    port:8033, 
    proxyTable: {},
    mongodbUrl:"mongodb://192.168.40.161:27017",
    dbName:'data-view',
    connectConfig:{
        poolSize: 10,
    }
}



module.exports=process.env.NODE_ENV=='production'?production:development
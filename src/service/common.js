let  moment=require( 'moment');

 function insertManyPreProcessor(arg){
    if(Array.isArray){
        arg=arg.map(el=>insertPreProcessor(el))
    }   
  return arg
}

 function insertPreProcessor(arg){    
  return {
    ...arg,
    insertTime:moment().format(),
    updateTime:moment().format(),
  }
}

 function updateManyPreProcessor(arg){
    if(Array.isArray){
        arg=arg.map(el=>updatePreProcessor(el))
    }   
  return arg
}

 function updatePreProcessor(arg){
    return {
        ...arg,        
        updateTime:moment().format(),
    }
}

module.exports={
    insertManyPreProcessor,
    insertPreProcessor,
    updateManyPreProcessor,
    updatePreProcessor
}
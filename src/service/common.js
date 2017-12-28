import momont from 'moment';

export function insertManyPreProcessor(arg){
    if(Array.isArray){
        arg=arg.map(el=>insertPreProcessor(el))
    }   
  return arg
}

export function insertPreProcessor(arg){    
  return {
    ...arg,
    insertTime:momont().format(),
    updateTime:moment().format(),
  }
}

export function updateManyPreProcessor(arg){
    if(Array.isArray){
        arg=arg.map(el=>updatePreProcessor(el))
    }   
  return arg
}

export function updatePreProcessor(arg){
    return {
        ...arg,        
        updateTime:moment().format(),
    }
}
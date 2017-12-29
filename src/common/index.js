function response(code=200,data={},msg="msg"){
    return {code,msg,data}
}

function success(data,msg='success'){
    return response(200,data,msg)
}

function error(msg="错误"){
    return response(403,{},msg)
}

function error403(msg="没有权限访问"){
    return response(403,{},msg)
}

function error500(msg="服务器内部错误"){
    return response(200,{},msg)
}

function error404(msg="文件未找到"){
    return response(404,data,msg)
}

module.exports={
    success,
    error,
    error403,
    error500,
    error404
}


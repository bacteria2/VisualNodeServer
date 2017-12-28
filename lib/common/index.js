function response(code = 200, data = {}, msg = "msg") {
    return { code, msg, data };
}

export function success(data, msg = 'success') {
    return response(200, data, msg);
}

export function error(msg = "错误") {
    return response(403, {}, msg);
}

export function error403(msg = "没有权限访问") {
    return response(403, {}, msg);
}

export function error500(msg = "服务器内部错误") {
    return response(200, {}, msg);
}

export function error404(msg = "文件未找到") {
    return response(404, data, msg);
}
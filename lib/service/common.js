var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import momont from 'moment';

export function insertManyPreProcessor(arg) {
    if (Array.isArray) {
        arg = arg.map(el => insertPreProcessor(el));
    }
    return arg;
}

export function insertPreProcessor(arg) {
    return _extends({}, arg, {
        insertTime: momont().format(),
        updateTime: moment().format()
    });
}

export function updateManyPreProcessor(arg) {
    if (Array.isArray) {
        arg = arg.map(el => updatePreProcessor(el));
    }
    return arg;
}

export function updatePreProcessor(arg) {
    return _extends({}, arg, {
        updateTime: moment().format()
    });
}
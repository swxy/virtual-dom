'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isArray = undefined;
exports.isString = isString;
exports.isVNode = isVNode;
exports.isVText = isVText;

var _constant = require('./constant');

/**
 * Created by swxy on 2017/4/10.
 */
require("babel-polyfill");
var isArray = exports.isArray = Array.isArray;

function isString(str) {
    return Object.prototype.toString.call(str) === '[object String]';
}

function isVNode(x) {
    return x && x.type === _constant.vnode && x.version === _constant.version;
}

function isVText(x) {
    return x && x.type === _constant.vtext && x.version === _constant.version;
}
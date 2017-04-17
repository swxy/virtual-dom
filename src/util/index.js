/**
 * Created by swxy on 2017/4/10.
 */
require("babel-polyfill");
import {vnode, vtext, version} from './constant';

export const isArray = Array.isArray;

export function isString (str) {
    return Object.prototype.toString.call(str) === '[object String]';
}

export function isVNode(x) {
    return x && x.type === vnode && x.version === version;
}

export function isVText(x) {
    return x && x.type === vtext && x.version === version;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createElement;

var _util = require('../util');

function createElement(node) {
    if ((0, _util.isVText)(node)) {
        return document.createTextNode(node.text);
    }
    var $el = document.createElement(node.tagName);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
} /**
   * Created by swxy on 2017/4/10.
   */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createElement;
exports.setProperties = setProperties;

var _util = require('../util');

function createElement(node) {
    if ((0, _util.isVText)(node)) {
        return document.createTextNode(node.text);
    }
    var $el = document.createElement(node.tagName);
    setProperties($el, node.properties);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
} /**
   * Created by swxy on 2017/4/10.
   */
function setProperties(node, properties) {
    Object.keys(properties).forEach(function (propName) {
        var propValue = properties[propName];
        if (propName.startsWith('on')) {
            // node的事件都是小写
            propName = propName.toLowerCase();
        }
        node[propName] = propValue;
    });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = applyPatch;

var _constant = require('../util/constant');

var CONSTANTS = _interopRequireWildcard(_constant);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @file 更新真实dom
 * Created by swxy on 2017/4/12.
 */
function applyPatch(vPatch, domNode) {
    var type = vPatch.type,
        patch = vPatch.patch,
        vNode = vPatch.vNode;


    switch (type) {
        case CONSTANTS.REMOVE:
            remove(domNode);
            break;
        case CONSTANTS.INSERT:
            insert(domNode, patch);
            break;
        case CONSTANTS.VTEXT:
            textPatch(domNode, patch);
            break;
        case CONSTANTS.VNODE:
            nodePatch(domNode, patch);
            break;
        case CONSTANTS.PROPS:
            (0, _create.setProperties)(domNode, patch);
            break;
    }
}

function remove(domNode) {
    var parentNode = domNode.parentNode;
    if (parentNode) {
        parentNode.removeChild(domNode);
    }
}

function insert(domNode, patch) {
    var newNode = (0, _create2.default)(patch);
    if (domNode) {
        domNode.appendChild(newNode);
    }
}

function textPatch(domNode, vText) {
    if (domNode.type === 3) {
        domNode.replaceData(0, domNode.length, vText.text);
    } else {
        var parentNode = domNode.parentNode;
        if (parentNode) {
            parentNode.replaceChild((0, _create2.default)(vText), domNode);
        }
    }
}

function nodePatch(domNode, vNode) {
    var parentNode = domNode.parentNode;
    if (parentNode) {
        parentNode.replaceChild((0, _create2.default)(vNode), domNode);
    }
}
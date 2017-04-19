'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = diff;

var _util = require('../util');

var _vpatch = require('./vpatch');

var _vpatch2 = _interopRequireDefault(_vpatch);

var _constant = require('../util/constant');

var CONSTANT = _interopRequireWildcard(_constant);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function diff(a, b) {
    var patch = { a: a };
    walk(a, b, patch, 0);
    return patch;
} /**
   * @file diff 比较新旧树
   * Created by swxy on 2017/4/11.
   */


function walk(a, b, patch, index) {
    var apply = patch[index];

    if (b === null) {
        apply = appendPatch(apply, new _vpatch2.default(CONSTANT.REMOVE, a, b));
    } else if ((0, _util.isVNode)(b)) {
        if ((0, _util.isVNode)(a)) {
            if (a.tagName === b.tagName) {
                var propsPatch = diffProps(a.properties, b.properties);
                if (!(0, _util.isEmptyObject)(propsPatch)) {
                    apply = appendPatch(apply, new _vpatch2.default(CONSTANT.PROPS, a, propsPatch));
                }
            } else {
                apply = appendPatch(apply, new _vpatch2.default(CONSTANT.VNODE, a, b));
            }
            apply = diffChildren(a, b, patch, apply, index);
        } else {
            apply = appendPatch(apply, new _vpatch2.default(CONSTANT.VNODE, a, b));
        }
    } else if ((0, _util.isVText)(b)) {
        if (!(0, _util.isVText)(a) || a.text !== b.text) {
            apply = appendPatch(apply, new _vpatch2.default(CONSTANT.VTEXT, a, b));
        }
    }

    if (apply) {
        patch[index] = apply;
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if ((0, _util.isArray)(apply)) {
            apply.push(patch);
        } else {
            apply = [apply, patch];
        }
        return apply;
    } else {
        return patch;
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children;
    var bChildren = b.children;
    var len = Math.max(aChildren.length, bChildren.length);
    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i];
        var rightNode = bChildren[i];
        index += 1;

        if (!leftNode) {
            if (rightNode) {
                apply = appendPatch(apply, new _vpatch2.default(CONSTANT.INSERT, null, rightNode));
            }
        } else if (!rightNode) {
            if (leftNode) {
                apply = appendPatch(apply, new _vpatch2.default(CONSTANT.REMOVE, null, rightNode));
            }
        } else {
            walk(leftNode, rightNode, patch, index);
        }

        if ((0, _util.isVNode)(leftNode) && leftNode.count) {
            index += leftNode.count;
        }
    }

    return apply;
}

function diffProps(oldProps, newProps) {
    var diff = {};
    for (var oldKey in oldProps) {
        if (!(oldKey in newProps)) {
            diff[oldKey] = undefined; // 表示需要删除的属性
        } else if (oldProps[oldKey] !== newProps[oldKey]) {
            diff[oldKey] = newProps[oldKey];
        }
    }

    for (var newKey in newProps) {
        if (!(newKey in oldProps)) {
            diff[newKey] = newProps[newKey];
        }
    }
    return diff;
}
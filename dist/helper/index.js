'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (tagName, props, children) {
    // 简化传的参数
    if (!children) {
        if (isChildren(props)) {
            children = props;
            props = undefined;
        }
    }

    var childNodes = [];
    if ((0, _util.isArray)(children)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var child = _step.value;

                if ((0, _util.isString)(child)) {
                    childNodes.push(new _vtext2.default(child));
                } else {
                    childNodes.push(child);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    } else if ((0, _util.isString)(children)) {
        childNodes = [new _vtext2.default(children)];
    }

    return new _vnode2.default(tagName, props, childNodes);
};

var _util = require('../util');

var _vtext = require('../vtree/vtext');

var _vtext2 = _interopRequireDefault(_vtext);

var _vnode = require('../vtree/vnode');

var _vnode2 = _interopRequireDefault(_vnode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 辅助函数，用于表示dom节点结构
 * Created by swxy on 2017/4/10.
 */
require("babel-polyfill");

function isChild(x) {
    return (0, _util.isVNode)(x) || (0, _util.isVText)(x);
}

function isChildren(x) {
    return (0, _util.isArray)(x) || (0, _util.isString)(x) || isChild(x);
}

/**
 * 简化操作，暂时不考虑标签属性的变化
 * @param tagName
 * @param props
 * @param children
 * @return {VNode}
 */
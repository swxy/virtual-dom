'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constant = require('../util/constant');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by swxy on 2017/4/10.
                                                                                                                                                           */


var VNode = function VNode(tagName) {
    var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, VNode);

    this.tagName = tagName;
    this.properties = properties;
    this.children = children;
};

exports.default = VNode;


VNode.prototype.type = _constant.vnode;
VNode.prototype.version = _constant.version;
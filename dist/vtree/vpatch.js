'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constant = require('../util/constant');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @file
                                                                                                                                                           * Created by swxy on 2017/4/11.
                                                                                                                                                           */


var VPatch = function VPatch(type, vNode, patch) {
    _classCallCheck(this, VPatch);

    this.type = +type;
    this.vnode = vNode;
    this.patch = patch;
};

exports.default = VPatch;


VPatch.prototype.version = _constant.version;
VPatch.prototype.type = _constant.vpatch;
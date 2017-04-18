'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constant = require('../util/constant');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by swxy on 2017/4/10.
                                                                                                                                                           */

var VText = function VText(text) {
    _classCallCheck(this, VText);

    this.text = text;
};

exports.default = VText;

VText.prototype.type = _constant.vtext;
VText.prototype.version = _constant.version;
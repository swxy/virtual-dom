'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = patch;

var _domIndex = require('./dom-index');

var _domIndex2 = _interopRequireDefault(_domIndex);

var _patchOp = require('./patch-op');

var _patchOp2 = _interopRequireDefault(_patchOp);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function patch(rootNode, patches) {
    // 获取patches的下标
    var indices = Object.keys(patches).filter(function (key) {
        return key !== 'a';
    }).map(function (key) {
        return +key;
    });

    // 不需要更新
    if (!indices.length) {
        return rootNode;
    }

    var index = (0, _domIndex2.default)(rootNode, patches.a, indices);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = indices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var nodeIndex = _step.value;

            applyPatch(index[nodeIndex], patches[nodeIndex]);
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
} /**
   * @file 检测是否有数据变化，然后执行更新
   * Created by swxy on 2017/4/10.
   */


function applyPatch(domNode, patchList) {
    if (!domNode) {
        return;
    }
    if ((0, _util.isArray)(patchList)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = patchList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _patch = _step2.value;

                (0, _patchOp2.default)(_patch, domNode);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    } else {
        (0, _patchOp2.default)(patchList, domNode);
    }
}
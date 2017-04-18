'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helper = require('./helper');

Object.defineProperty(exports, 'h', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_helper).default;
  }
});

var _diff = require('./vtree/diff');

Object.defineProperty(exports, 'diff', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_diff).default;
  }
});

var _create = require('./vdom/create');

Object.defineProperty(exports, 'render', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_create).default;
  }
});

var _patch = require('./vdom/patch');

Object.defineProperty(exports, 'patch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_patch).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by swxy on 2017/4/10.
 */

require("babel-polyfill");

var vnode = exports.vnode = 'VirtualNode';
var vtext = exports.vtext = 'VirtualText';
var vpatch = exports.vpatch = 'VirtualPatch';
var version = exports.version = '0.0.1';

var NODE = exports.NODE = 0;
var VTEXT = exports.VTEXT = 1;
var VNODE = exports.VNODE = 2;
var PROPS = exports.PROPS = 4;
var ORDER = exports.ORDER = 5;
var INSERT = exports.INSERT = 6;
var REMOVE = exports.REMOVE = 7;
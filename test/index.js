/**
 * @file 测试
 * Created by swxy on 2017/4/17.
 */

import {h, diff} from '../src';

const hello = h("div", {className: "hello"}, "hello")
const world = h("div", {}, "hello")
const patches = diff(hello, world);
console.log(JSON.stringify(hello, null, 4));
console.log(JSON.stringify(world, null, 4));
console.log(JSON.stringify(patches, null, 4));

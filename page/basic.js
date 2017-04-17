/**
 * Created by swxy on 2017/4/13.
 */

import {h, diff, patch, render} from '../src';

const hello = h("div", "hello");
const helloNode = render(hello);

document.querySelector('#root').appendChild(helloNode);
/**
 * Created by swxy on 2017/4/18.
 */

import {h, diff, patch, render} from '../dist';

const hello = h("div", [h("span", "hello")]);
const helloNode = render(hello);

document.querySelector('#root').appendChild(helloNode);

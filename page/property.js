/**
 * Created by swxy on 2017/4/18.
 */

import {h, diff, patch, render} from '../src';

let hello = h("div", {"className": "hello", onClick: function() {alert('you click me')}}, [h("span", "hello")]);
let world = h("div", {"className": "world"}, [h("span", "world")]);
const helloNode = render(hello);
const rootNode = document.querySelector('#root');

document.querySelector('#update').onclick = function () {
    const d = diff(hello, world);
    patch(helloNode, d);
    [hello, world] = [world, hello];
    this.textContent = this.textContent === 'update' ? 'reset' : 'update';
};

document.querySelector('.left').innerHTML = JSON.stringify(hello, null, 4);
document.querySelector('.right').innerHTML = JSON.stringify(world, null, 4);
rootNode.appendChild(helloNode);

/**
 * Created by swxy on 2017/4/10.
 */
import {isVText} from '../util';

export default function createElement(node) {
    if (isVText(node)) {
        return document.createTextNode(node.text);
    }
    let $el = document.createElement(node.tagName);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}
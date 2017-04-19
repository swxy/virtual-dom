/**
 * Created by swxy on 2017/4/10.
 */
import {isVText} from '../util';

export default function createElement(node) {
    if (isVText(node)) {
        return document.createTextNode(node.text);
    }
    let $el = document.createElement(node.tagName);
    setProperties($el, node.properties);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}

export function setProperties(node, properties) {
    Object.keys(properties).forEach(propName => {
        let propValue = properties[propName];
        if (propName.startsWith('on')) {
            // node的事件都是小写
            propName = propName.toLowerCase();
        }
        node[propName] = propValue;
    });
}
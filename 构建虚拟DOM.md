在浏览器渲染页面，会将html文本解析成树状结构，那如何使用js对象表述html文本？

例如，有一段html文本：
```html
<ul class=”list”>
  <li>item 1</li>
  <li>item 2</li>
</ul>
```
如何用js来描述这段html的结构。

很容易的发现html是个树形结构，可以抽象为:
```
ul -------- li -- item 1
      |
      |---- li -- item 2

```
每一个节点对应DOM中一个NODE，像`item 1`、 `item 2`这种是文本节点，而像`ul`、 `li`这种是元素节点。
文本节点可以简单的理解为就是字符串，而元素节点可以包含属性，嵌套元素，嵌套文本节点的等。

每一个元素节点都会有`tagName`, `props`，可以用`children`来表述嵌套的节点，因此可以将上述结构具体化为：
```json
{ 
    "tagName": "ul",
    "props": { 
        "class": "list" 
    }, 
    "children": [{
        "tagName": "li", 
        "props": {}, 
        "children": ["item 1"]
    }, { 
        "tagName": "li", 
        "props": {}, 
        "children": ["item 2"] 
    }]
}
```

一个页面往往有可能有许多个元素节点，如果手动写这个对象很是困难，而且容易出错。每一个元素节点的结构都一致，因此可以新建一个辅助函数来描述。
```js
// 这里用的ES6中的语法
function h(tagName, props, ...children) {
    return {tagName, props, children};
}
```

上述对象可以简化为：
```js
h('ul', {'class': 'list'}, 
    h('li', {}, 'item 1'),
    h('li', {}, 'item 2')
)
```

当然也可以使用[babel编译](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx)以下jsx:
```jsx harmony
/** @jsx h */
<ul className="list">
  <li>item 1</li>
  <li>item 2</li>
</ul>
```
使用babel编译时，需要先安装：
```angular2html
npm i --save-dev babel-cli babel-core babel-plugin-transform-react-jsx
```
然后执行`babel --plugins transform-react-jsx xxx.js`.
具体可以参考[React JSX transform](https://babeljs.io/docs/plugins/transform-react-jsx/)

编译之后输入结果为：
```js
/** @jsx h */
h(
    "ul",
    { className: "list" },
    h(
        "li",
        null,
        "item 1"
    ),
    h(
        "li",
        null,
        "item 2"
    )
);

```

遗留问题： 如何将上述对象（虚拟DOM）渲染到页面中。
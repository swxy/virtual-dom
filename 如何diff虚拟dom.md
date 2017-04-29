在[渲染虚拟DOM](./渲染虚拟DOM.md)中提到一个直接比较虚拟dom节点是否一致，然后更新元素的方式来执行虚拟dom的diff操作。
但这样diff操作是和真实dom操作耦合在一块，不便于优化。

为了解决上述问题，参照[Matt-Esch/virtual-dom](https://github.com/Matt-Esch/virtual-dom) `v0.0.10`版本实现思路：

1. 首先修改一下虚拟DOM的表现形式，用`VText`、`VNode`分别表示文本和元素节点，其对应的结构为：
  ```js
  // VText 结构
  export default class VText {
      constructor(text) {
          this.text = text;
      }
  }
  VText.prototype.type = 'VirtualText';

  // VNode 结构
  export default class VNode {
      constructor(tagName, properties = {}, children = []) {
          this.tagName = tagName;
          this.properties = properties;
          this.children = children;
      }
  }
  
  VNode.prototype.type = 'VirtualNode';
  ```
  
2. 新增一个patch类，表示有变化的节点或者元素。
  ```js
  export default class VPatch{
      constructor(type, vNode, patch) {
          this.type = +type; // type 表示操作类型，例如插入，替换等。
          this.vnode = vNode;
          this.patch = patch;
      }
  }
  
  VPatch.prototype.type = 'VirtualPatch';
  ```
3. 先看效果diff效果，然后再来分析diff原理：
  ```js
  const hello = h("div", "hello")
  const world = h("div", "world")
  const patches = diff(hello, world);
  console.log(JSON.stringify(patches, null, 4));
  ```
  结果
  ```json
  {
      "1": { // 表示dom所在的层级
          "type": 1, // diff之后的操作类型，用于标识是新增或者删除
          "vnode": { // 需要被替换的节点，可能是文本或者元素节点
              "text": "hello"
          },
          "patch": { // 需要替换的节点
              "text": "world"
          }
      },
      "a": { // 存储被diff的虚拟dom对象。
          "tagName": "div",
          "properties": {},
          "children": [
              {
                  "text": "hello"
              }
          ]
      }
  }
  ```
  
  从上面diff结果可以发现里面会有key为数字的属性，代表节点在dom树中的位置，这个其实就是diff算法的关键。一般来说diff一棵树，
  无论是采用深度或者广度遍历或者其他方式，其复杂度都会相对很高，而React介绍了一种采用层级比较的方式，虽然不是非常完美，
  但能解决大部分问题，而且性能也提高不少，复杂度由 O(n^3) --> O(n)。
  
  ![分层diff](http://7tszky.com1.z0.glb.clouddn.com/Fhq0GHcNOOmQzOatlocjiumnfhiS)
  [图片来源](https://calendar.perfplanet.com/2013/diff/)
  
  如上图，思想就是对比每一层是否有节点一致，一般情况下很少会出现跨层级移动元素的场景。
  
4. 实现diff操作，结合上述图片可以大致知道需要遍历每一层结构，如果没有变化，则递归遍历子节点:
  ```js
  function diff(a, b) {
      const patch = {a};
      walk(a, b, patch, 0);
      return patch;
  }
  // 对比节点
  function walk(a, b, patch, index) {
      let apply = patch[index];
  
      if (b === null) {
         appendPatch(apply, new VPatch(CONSTANT.REMOVE, a, b));
      }
      else if (isVNode(b)) {
          if (isVNode(a)) {
              diffChildren(a, b, patch, apply, index);
          }
          else {
              appendPatch(apply, new VPatch(CONSTANT.VNODE, a, b));
          }
      }
      else if (isVText(b)) {
          if (!isVText(a) || a.text !== b.text) {
              appendPatch(apply, new VPatch(CONSTANT.VTEXT, a, b));
          }
      }
      ...
  }
  
  // diff 子节点
  function diffChildren(a, b, patch, apply, index) {
      const aChildren = a.children;
      const bChildren = b.children;
      const len = Math.max(aChildren.length, bChildren.length);
      for (let i = 0; i < len; i++) {
          let leftNode = aChildren[i];
          let rightNode = bChildren[i];
          index += 1;
  
          if (!leftNode) {
              if (rightNode) {
                  appendPatch(apply, new VPatch(CONSTANT.INSERT, null, rightNode));
              }
          }
          else if (!rightNode) {
              if (leftNode) {
                  appendPatch(apply, new VPatch(CONSTANT.REMOVE, null, rightNode));
              }
          }
          else {
              walk(leftNode, rightNode, patch, index);
          }
      }
  
      return apply;
  }
  ```
  [详细请看考源码](https://github.com/swxy/virtual-dom/tree/master/src/vtree/diff.js)
  
  
参考：
1. [React’s diff algorithm](http://calendar.perfplanet.com/2013/diff/)
2. [Matt-Esch/virtual-dom的diff源码](https://github.com/Matt-Esch/virtual-dom/blob/master/vtree/diff.js)
3. [简化版实现](https://github.com/swxy/virtual-dom/tree/master/src/vtree/diff.js)
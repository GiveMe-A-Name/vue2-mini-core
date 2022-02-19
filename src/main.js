import Compiler from "./Compiler";
import Observer from "./Observer";

class MyVue {
  constructor(options) {
    // 1. 绑定dom元素为根节点
    if (this.isElement(options.el)) {
      this.$el = options.el;
    } else {
      this.$el = document.querySelector(options.el);
    }

    // 2. 绑定 data
    this.$data = options.data;
    if (this.$el) {
      // 3. 监听 data
      new Observer(this.$data);

      // 4. 渲染 根节点
      new Compiler(this);
    }
  }

  /**
   * 判断 node 是否的dom元素
   * @param {HTMLElement} node
   * @returns
   */
  isElement(node) {
    return node.nodeType === 1;
  }
}

new MyVue({
  el: "#app",
  data: {
    user: {
      name: "nihao",
      age: 13,
    },
  },
});

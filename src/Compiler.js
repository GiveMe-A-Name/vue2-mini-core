import CompilerUtil from "./CompilerUtil";
class Compiler {
  constructor(vm) {
    this.vm = vm; // vm => MyVue实例

    // 1.将网页上的元素保存到内存数据中
    let fragment = this.node2fragment(this.vm.$el);

    // 2.编译内存中的元素
    this.buildTemplate(fragment);

    // 3.将编译好的内容重新渲染会网页上
    this.vm.$el.appendChild(fragment);
  }

  /**
   *
   * @param {HTMLElement} app
   * @returns {DocumentFragment}
   */
  node2fragment(app) {
    // 1.创建一个空的文档碎片对象
    // docs: https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment
    let fragment = document.createDocumentFragment();

    // 2.编译循环取到每一个元素
    // 将页面上的每一个元素都放入到 fragment 中
    let node = app.firstChild;
    while (node) {
      // 注意点: 只要将元素添加到了文档碎片对象中, 那么这个元素就会自动从网页上消失
      fragment.appendChild(node);
      node = app.firstChild;
    }

    // 3.返回存储了所有元素的文档碎片对象
    return fragment;
  }

  /**
   *
   * @param {DocumentFragment} fragment
   */
  buildTemplate(fragment) {
    const nodeList = [...fragment.childNodes];
    nodeList.forEach((node) => {
      // 需要判断当前遍历到的节点是一个元素还是一个文本
      if (this.vm.isElement(node)) {
        this.buildElement(node);
        // 递归处理子元素
        this.buildTemplate(node);
      } else {
        this.buildText(node);
      }
    });
  }

  /**
   * 处理元素节点
   * @param {HTMLElement} node
   */
  buildElement(node) {
    const attrs = [...node.attributes];
    attrs.forEach((attr) => {
      // 将属性的key - value 结构出来。
      // Example:
      // v-model="name" => {name:v-model  value:name}
      const { name, value } = attr;

      // 如果属性名是以 'v-' 开头的，则进行进一步的处理
      // v-model / v-html / v-text / v-xxx
      if (name.startsWith("v-")) {
        // 将 v-xxx 解析成 [v, xxx];
        // Example:
        // v-model -> [v, model]
        let [_, directive] = name.split("-");
        CompilerUtil[directive](node, value, this.vm);
      }
    });
  }

  /**
   * 处理文本节点
   * @param {Text} node
   */
  buildText(node) {
    let content = node.textContent;
    let reg = /\{\{.+?\}\}/gi; // 正则表达式

    // 如果文本节点中有 {{}} 语法，也需要进行处理.
    if (reg.test(content)) {
      CompilerUtil["content"](node, content, this.vm);
    }
  }
}

export default Compiler;

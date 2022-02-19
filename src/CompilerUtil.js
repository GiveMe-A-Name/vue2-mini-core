import Watcher from "./Watcher";
// 语法处理对象
let CompilerUtil = {
  /**
   * 获得data数据
   *
   * Example:
   *
   * 下面是 vue 语法的插值表达式，需要获得 data 中的 user.name数据
   *
   * {{ user.name }}
   * 使用方法 getValue(vm, 'user.name') => user.name数据
   * @param {any} vm
   * @param {String} value
   * @returns
   */
  getValue(vm, value) {
    // 解析this.data.aaa.bbb.ccc这种属性
    return value.split(".").reduce((data, currentKey) => {
      return data[currentKey.trim()];
    }, vm.$data);
  },

  getContent(vm, value) {
    // 解析{{}}中的变量
    let reg = /\{\{(.+?)\}\}/gi;
    let val = value.replace(reg, (...args) => {
      return this.getValue(vm, args[1]);
    });
    return val;
  },
  // 解析v-model指令
  model: function (node, value, vm) {
    // 在触发getter之前，为dom创建Wather，并为Watcher.target赋值
    new Watcher(vm, value, (newValue, oldValue) => {
      node.value = newValue;
    });
    let val = this.getValue(vm, value);
    node.value = val;
  },
  // 解析v-html指令
  html: function (node, value, vm) {
    // 在触发getter之前，为dom创建Wather，并为Watcher.target赋值
    new Watcher(vm, value, (newValue, oldValue) => {
      node.innerHTML = newValue;
    });
    let val = this.getValue(vm, value);
    node.innerHTML = val;
  },
  // 解析v-text指令
  text: function (node, value, vm) {
    // 在触发getter之前，为dom创建Wather，并为Watcher.target赋值
    new Watcher(vm, value, (newValue, oldValue) => {
      node.innerText = newValue;
    });
    let val = this.getValue(vm, value);
    node.innerText = val;
  },
  // 解析{{}}中的变量
  content: function (node, value, vm) {
    let reg = /\{\{(.+?)\}\}/gi;
    let val = value.replace(reg, (...args) => {
      // 在触发getter之前，为dom创建Wather，并为Watcher.target赋值
      new Watcher(vm, args[1], (newValue, oldValue) => {
        node.textContent = this.getContent(vm, value);
      });
      return this.getValue(vm, args[1]);
    });
    node.textContent = val;
  },
};

export default CompilerUtil;

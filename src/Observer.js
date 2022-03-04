import Dep from "./Dep";
class Observer {
  constructor(data) {
    this.observer(data);
  }

  observer(obj) {
    // 注： 只有obj为对象的时候才会近一步处理
    if (obj && typeof obj === "object") {
      for (let key in obj) {
        this.defineReactive(obj, key, obj[key]);
      }
    }
  }

  /**
   *
   * @param {Object} obj - 需要操作的对象
   * @param {String} key - 需要新增get/set方法的属性名
   * @param {any} value - 需要新增get/set方法属性的取值
   */
  defineReactive(obj, key, value) {
    // 如果属性的取值又是一个对象, 那么也需要给这个对象的所有属性添加get/set方法
    this.observer(value);

    // 第三步: 将当前属性的所有观察者对象都放到当前属性的发布订阅对象中管理起来
    let dep = new Dep(); // 创建了属于当前属性的发布订阅对象

    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue) {
        if (value !== newValue) {
          console.log("监听到数据的变化");
          value = newValue;

          dep.notify();
        }
      },
    });
  }
}

export default Observer;

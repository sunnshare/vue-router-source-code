import routerLink from "./components/router-link";
import routerView from "./components/router-view";

export let Vue;

function install(_Vue) {
  Vue = _Vue; // 将传入的 Vue 构造函数变为全局的

  Vue.mixin({
    beforeCreate() {
      // 组件渲染是从父到子的
      if (this.$options.router) {
        this._routerRoot = this; // 根实例
        this._router = this.$options.router; // 通过 merginOptions 合并的 router

        this._router.init(this); // 根实例只会初始化一次

        // 给根实例添加一个属性 _route 指向 current 对象
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        // 在所有组件都增加一个根实例
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });

  // 代理去取 _router
  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot && this._routerRoot._router;
    },
  });

  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot && this._routerRoot._route;
    },
  });

  Vue.component("router-link", routerLink);
  Vue.component("router-view", routerView);
}
export default install;

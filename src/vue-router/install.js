export let Vue;

function install(_Vue) {
  Vue = _Vue; // 将传入的 Vue 构造函数变为全局的

  Vue.mixin({
    beforeCreate() {
      // 组件渲染是从父到子的
      if (this.$options.router) {
        this._routerRoot = this; // 根实例
        this._router = this.$options.router; // 通过 merginOptions 合并的 router
      } else {
        // 在所有组件都增加一个根实例
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });

  Vue.component("router-link", {
    render() {
      return <a>{this.$slots.default}</a>;
    },
  });

  Vue.component("router-view", {
    render() {
      return <a>{this.$slots.default}</a>;
    },
  });
}
export default install;

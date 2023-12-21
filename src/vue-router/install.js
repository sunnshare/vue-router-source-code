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

  Vue.component("router-link", {
    props: {
      to: { type: String, required: true },
      tag: { type: String, default: "a" },
    },
    methods: {
      handler() {
        this.$router.push(this.to);
      },
    },
    render() {
      let tag = this.tag;
      return <tag onClick={this.handler}>{this.$slots.default}</tag>;
    },
  });

  Vue.component("router-view", {
    render() {
      return <div>空</div>;
    },
  });
}
export default install;

import install, { Vue } from "./install";

class VueRouter {
  constructor(options) {
    // 用户传递的路由配置，可对其进行一个路由映射
    let routes = options.routes;
  }
}

// Vue.use 会调用插件的 install 方法
VueRouter.install = install;

export default VueRouter;

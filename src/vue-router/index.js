import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";
import BrowserHistory from "./history/history";
import install, { Vue } from "./install";

class VueRouter {
  constructor(options) {
    // 用户传递的路由配置，可对其进行一个路由映射
    let routes = options.routes;
    this.beforeEachHooks = [];

    this.matcher = createMatcher(routes);

    let mode = options.mode || "hash";
    if (mode === "hash") {
      this.history = new HashHistory(this);
    } else if (mode === "history") {
      this.history = new BrowserHistory(this);
    }
  }

  match(location) {
    return this.matcher.match(location);
  }

  push(location) {
    return this.history.push(location);
  }

  beforeEach(cb) {
    this.beforeEachHooks.push(cb);
  }

  init(app) {
    let history = this.history;
    history.transitionTo(history.getCurrentLocation(), () => {
      history.setupListener(); // 监听路由的变化
    });

    history.listen((newRoute) => {
      app._route = newRoute;
    });
  }
}

// Vue.use 会调用插件的 install 方法
VueRouter.install = install;

export default VueRouter;

import Base from "./base";

class BrowserHistory extends Base {
  constructor(router) {
    super(router);
  }
  setupListener() {
    window.addEventListener("popstate", () => {
      this.transitionTo(window.location.pathname);
    });
  }

  getCurrentLocation() {
    return window.location.pathname;
  }
}

export default BrowserHistory;

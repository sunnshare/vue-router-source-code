function createRoute(record, location) {
  let matched = [];
  if (record) {
    while (record) {
      matched.unshift(record);
      record = record.parent;
    }
  }
  return {
    ...location,
    matched,
  };
}

class Base {
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, {
      path: "/",
    });
  }

  transitionTo(location, listener) {
    let record = this.router.match(location);
    let route = createRoute(record, { path: location });
    // 当前跳转的路径和之前的路径一致，且匹配结果也一致就不再发生跳转
    if (
      location === this.current.path &&
      route.matched.length === this.current.matched.length
    ) {
      return;
    }

    this.current = route;
    listener && listener();
    this.cb && this.cb(route);
  }
  listen(cb) {
    this.cb = cb;
  }
}

export default Base;

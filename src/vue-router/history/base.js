class Base {
  constructor(router) {
    this.router = router;
  }

  transitionTo(location, listener) {
    let record = this.router.match(location);

    listener && listener();
  }
}

export default Base;

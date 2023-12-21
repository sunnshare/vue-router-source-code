import Base from "./base";

function ensureSlash() {
  if (window.location.hash) {
    return;
  }
  window.location.hash = "/";
}

function getHash() {
  return window.location.hash.slice(1);
}

class HashHistory extends Base {
  constructor(router) {
    super(router);

    // 初始化hash路由时，给定一个默认的hash路径
    ensureSlash();
  }

  setupListener() {
    window.addEventListener("hashchange", () => {
      console.log(getHash());
    });
  }

  getCurrentLocation() {
    return getHash();
  }
}

export default HashHistory;

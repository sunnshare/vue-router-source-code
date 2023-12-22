export default {
  functional: true, // 只为渲染，不记录父子关系
  render(h, { parent, data }) {
    data.routerView = true; // 给每层 routerView 打个标记
    let route = parent.$route;
    let depth = 0;

    // 计算出当前 routerView 的层级
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }

    // 根据层级找出对应要渲染的记录
    let record = route.matched[depth];

    if (!record) {
      return h(); // 没有匹配到组件就直接渲染
    }

    return h(record.component, data);
  },
};

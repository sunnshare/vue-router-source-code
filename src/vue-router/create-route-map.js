// 根据用户选项扁平化路由信息
export default function createRouteMap(routes, pathMap) {
  pathMap = pathMap || {};
  routes.forEach((route) => {
    addRouteRecord(route, pathMap);
  });
  return { pathMap };
}

function addRouteRecord(route, pathMap, parentRecord) {
  let path = parentRecord
    ? `${parentRecord.path === "/" ? "" : parentRecord.path}/${route.path}`
    : route.path;

  let record = {
    path,
    component: route.component,
    props: route.props,
    meta: route.meta,
    parent: parentRecord,
  };

  if (!pathMap[path]) {
    // 维护路径对应的属性
    pathMap[path] = record;
  }
  // 递归将 children 添加到映射表里
  route.children &&
    route.children.forEach((childrenRoute) => {
      addRouteRecord(childrenRoute, pathMap, record);
    });
}

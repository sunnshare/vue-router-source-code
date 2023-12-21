import createRouteMap from "./create-route-map";

export default function createMatcher(routes) {
  let { pathMap } = createRouteMap(routes);

  function addRoutes(routes) {
    createRouteMap(routes, pathMap);
  }

  function addRoute(route) {
    createRouteMap([route], pathMap);
  }

  function match(location) {
    return pathMap[location];
  }

  return {
    addRoutes, // 添加多个路由
    addRoute, // 添加单个路由
    match, // 根据路径匹配路由
  };
}

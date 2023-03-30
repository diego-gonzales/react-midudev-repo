import { useState, useEffect, Children } from "react";
import { EVENTS } from "./consts";
import { match } from "path-to-regexp";

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>Not Found</h1>,
}) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Escuchar el evento personalizado
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  // add routes from children <Route /> components
  const routesFromChildren = Children.map(children, (child) => {
    return child.type.name === "Route" ? child.props : null;
  });

  const routesToUse = [...routes, ...routesFromChildren];

  const Page = routesToUse.find((route) => {
    if (route.path === currentPath) return true;

    const matcherUrl = match(route.path, { decode: decodeURIComponent });
    const matchResult = matcherUrl(currentPath);

    if (!matchResult) return false;

    routeParams = matchResult.params;
    return true;
  })?.component;

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}

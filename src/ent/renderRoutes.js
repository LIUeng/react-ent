/* copy from umijs source code */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import assert from 'assert';

// let plugins = null;
// let validKeys = [];

// function getItem(key) {
//   assert(validKeys.indexOf(key) > -1, `Invalid key ${key}`);
//   return plugins.filter(plugin => key in plugin).map(plugin => plugin[key]);
// }

function applyPlugin(item, { initialValue, args }) {
  // if (typeof item === 'string') item = getItem(item);
  // assert(Array.isArray(item), `item must be Array`);
  return [].reduce((memo, fn) => {
    assert(typeof fn === 'function', `applied item must be function`);
    return fn(memo, args);
  }, initialValue);
}

// const RouteInstanceMap = {
//   get(key) {
//     return key._routeInternalComponent;
//   },
//   has(key) {
//     return key._routeInternalComponent !== undefined;
//   },
//   set(key, value) {
//     key._routeInternalComponent = value;
//   },
// };

// Support pass props from layout to child routes
const RouteWithProps = ({ path, exact, strict, render, location, sensitive, ...rest }) => (
  <Route
    path={path}
    exact={exact}
    strict={strict}
    location={location}
    sensitive={sensitive}
    render={props => render({ ...props, ...rest })}
  />
);

function getCompatProps(props) {
  const compatProps = {};
  if (props.match && props.match.params && !props.params) {
    compatProps.params = props.match.params;
  }
  return compatProps;
}

function withRoutes(route) {
  // if (RouteInstanceMap.has(route)) {
  //   return RouteInstanceMap.get(route);
  // }

  // const { Routes } = route;
  // let len = Routes.length - 1;
  // let Component = args => {
  //   const { render, ...props } = args;
  //   return render(props);
  // };
  // while (len >= 0) {
  //   const AuthRoute = Routes[len];
  //   const OldComponent = Component;
  //   Component = props => (
  //     <AuthRoute {...props}>
  //       <OldComponent {...props} />
  //     </AuthRoute>
  //   );
  //   len -= 1;
  // }

  // const ret = args => {
  //   const { render, ...rest } = args;
  //   return (
  //     <RouteWithProps
  //       {...rest}
  //       render={props => {
  //         return <Component {...props} route={route} render={render} />;
  //       }}
  //     />
  //   );
  // };
  // RouteInstanceMap.set(route, ret);
  // return ret;
  return false;
}

export default function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.key || i}
              from={route.path}
              to={route.redirect}
              exact={route.exact}
              strict={route.strict}
            />
          );
        }
        const RouteRoute = route.Routes ? withRoutes(route) : RouteWithProps;
        return (
          <RouteRoute
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            sensitive={route.sensitive}
            render={props => {
              const childRoutes = renderRoutes(
                route.routes,
                {},
                {
                  location: props.location,
                },
              );
              if (route.component) {
                const compatProps = getCompatProps({
                  ...props,
                  ...extraProps,
                });

                const newProps = applyPlugin('modifyRouteProps', {
                  initialValue: {
                    ...props,
                    ...extraProps,
                    ...compatProps,
                  },
                  args: { route },
                });
                console.log(newProps);
                return (
                  <route.component {...newProps} route={route}>
                    {childRoutes}
                  </route.component>
                );
              } else {
                return childRoutes;
              }
            }}
          />
        );
      })}
    </Switch>
  ) : null;
}

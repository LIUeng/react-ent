import React from 'react';
import routes from './routes';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends React.PureComponent {
  render() {
    function renderRoutes(routes, extraProps = {}, switchProps = {}) {
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
            // const RouteRoute = route.Routes ? withRoutes(route) : RouteWithProps;
            return (
              <Route
                key={route.key || i}
                path={route.path}
                exact={route.exact}
                strict={route.strict}
                sensitive={route.sensitive}
                render={props => {
                  const childRoutes = renderRoutes(
                    route.routes,
                    // {},
                    // {
                    //   location: props.location,
                    // }
                  );
                  if (route.component) {
                    // const compatProps = getCompatProps({
                    //   ...props,
                    //   ...extraProps,
                    // });
                    // const newProps = window.g_plugins.apply('modifyRouteProps', {
                    //   initialValue: {
                    //     ...props,
                    //     ...extraProps,
                    //     ...compatProps,
                    //   },
                    //   args: { route },
                    // });
                    return (
                      <route.component {...props} route={route}>
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

    return <Router>{renderRoutes(routes)}</Router>;
  }
}

export default App;

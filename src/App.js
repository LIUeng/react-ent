import React from 'react';
import routes from './routes';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import BasicLayout from "./layouts/BasicLayout";
import User from './pages/User';
import BasicLayout from './layouts/BasicLayout';

class App extends React.PureComponent {
  render() {
    const renderRoutes = (routes, extraProps = {}, switchProps = {}) => {
      return routes ? (
        // <Switch>
        <div>
          {routes.map((route, i) => {
            return (
              <Route
                path={route.path}
                exact
                key={route.key || i}
                render={props => {
                  const childRoutes = renderRoutes(route.routes);
                  console.log(route.routes);
                  console.log(childRoutes);
                  if (route.component) {
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
          {/* </Switch> */}
        </div>
      ) : null;
    };

    return (
      <Router>
        {/* {renderRoutes(routes)} */}
        <Route path="/" component={BasicLayout}>
          {/* <Route path="/user" component={User} /> */}
        </Route>
      </Router>
    );
  }
}

export default App;

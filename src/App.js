import React, { Suspense, useContext } from "react";
import routes from './config/routes'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthContext } from "./context/authContext";

const Components = {};
for (const c of routes) {
  Components[c.component] = React.lazy(() => import(`./pages/` + c.component));
}

const NotFound = React.lazy(() => import(`./pages/NotFound`));

function App () {
  const { state } = useContext(AuthContext);

  return (
    <Router>

      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        { routes.map(c => {
          const C = Components[c.component];
          return (
            <Route
              key={ c.path }
              exact={ c.exact }
              path={ c.path }
              render={() => (
                c.isProtected?
                <PrivateRoute isAuthenticated={ state.isAuthenticated }>
                  <Suspense fallback={ null }>
                    <C />
                  </Suspense>
                </PrivateRoute> :
                <PublicRoute isAuthenticated={ state.isAuthenticated }>
                <Suspense fallback={ null }>
                  <C />
                </Suspense>
              </PublicRoute>
              )}
            />
          )
        })}
        <Route path="*">
            <Suspense fallback={ null }>       
              <NotFound />
            </Suspense>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
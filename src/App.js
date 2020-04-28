import React, { Suspense, useEffect, useContext } from "react";
import routes from './config/routes'
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./route";
import { useAuth } from "./context/userAuth";
import { SWITCH_AUTH_STATUS } from "./reducer";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthContext } from "./context/authContext";

const Components = {};
for (const c of routes) {
  Components[c.component] = React.lazy(() => import(`./pages/` + c.component));
}
const Menu = React.lazy(() => import(`./components/Menu`));
const RouteWithSubRoutes = (route) => {
  const C = Components[route.component];
  console.log(route);
  if(route.isProtected) {
    return (
      <Route
        exact={route.exact} 
        path={route.path}
        render={() => (
          <PrivateRoute isAuthenticated={route.auth}>
            <Suspense fallback={null}>
              <C />
            </Suspense>
          </PrivateRoute>
        )}
      />
    )
  } else {
    return (
      <Route
        exact={route.computedMatch.isExact} 
        path={route.path}
        render={() => (
          <PublicRoute isAuthenticated={route.auth}>
            <Suspense fallback={null}>
              <C />
            </Suspense>
          </PublicRoute>
        )}
      />
    )
  }
}

const token = window.localStorage.getItem("token");
function App () {
  // const { state, dispatch } = useContext(AppContext);
  const {login} = useAuth();
  const {state ,dispatch} = useContext(AuthContext);
  const local = window.location.pathname;
  console.log(local);
  console.log(token);
  console.log(state)
  useEffect(() => {
    console.log(1111)
    if(token)
      login({ type: SWITCH_AUTH_STATUS, payload: { status: true } });
  }, [dispatch]);
  console.log(state.isAuthenticated);
  console.log(local);
  return (
    <Router>
      {/* Kiem tra de dieu huong khi nguoi dung truy cap vao index.html */}
      {state.isAuthenticated ? (
       <Suspense fallback={null}>
       <Menu />
     </Suspense>
      ) : ''
      }
      {local ==='/' && state.isAuthenticated? (
        <Redirect to="/dashboard"></Redirect>
      ) : ''}
      <Switch>
      {
        routes.map(route => (
          <RouteWithSubRoutes key={route.path} {...route} auth={state.isAuthenticated}/>
        ))
      }
      </Switch>
    </Router>
  )
}

export default App;
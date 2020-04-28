import React, { Suspense, useEffect, useContext } from "react";
import {privateRoute, publicRoute} from './config/routes'
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
for (const c of privateRoute) {
  Components[c.component] = React.lazy(() => import(`./pages/` + c.component));
}

for (const c of publicRoute) {
  Components[c.component] = React.lazy(() => import(`./pages/` + c.component));
}
const Menu = React.lazy(() => import(`./components/Menu`));


const token = window.localStorage.getItem("token");
function App () {
  console.log(privateRoute, publicRoute);
  // const { state, dispatch } = useContext(AppContext);
  const {login} = useAuth();
  const {state ,dispatch} = useContext(AuthContext);
  const local = window.location.pathname;
  console.log(local);
  console.log(token);
  console.log(state)
  // useEffect(() => {
  //   if(token)
  //     login({ type: SWITCH_AUTH_STATUS, payload: { status: true } });
  // }, [dispatch]);
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
      ) :''}
      <Switch>
      {privateRoute.map(c => {
          const C = Components[c.component];
          return (
            <Route
              key={c.path}
              exact={c.exact}
              path={c.path}
              render={() => (
                // Bao ve Route can authentication bang Redirect
                <PrivateRoute isAuthenticated={state.isAuthenticated}>
                  <Suspense fallback={null}>
                    <C />
                  </Suspense>
                </PrivateRoute>
              )}
            />
          ); 
        })} 
      {publicRoute.map(c => {
          // Route khong can bao ve, nhung khong duoc truy cap khi da authenticated
          const C = Components[c.component];
          return (
            <Route
              key={c.path}
              exact={c.exact}
              path={c.path}
              render={() => (
                <PublicRoute isAuthenticated={state.isAuthenticated}>
                  <Suspense fallback={null}>
                    <C />
                  </Suspense>
                </PublicRoute>
              )}
            />
          );
        })}
      
      </Switch>
    </Router>
  )
}

export default App;
import React, { Suspense, useEffect, useContext } from "react";
import routes from './config/routes'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./route";
import { useAuth } from "./context/userAuth";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthContext } from "./context/authContext";

const Components = {};
for (const c of routes) {
  Components[c.component] = React.lazy(() => import(`./pages/` + c.component));
}


const NotFound = React.lazy(() => import(`./pages/NotFound`));

const token = JSON.parse(localStorage.getItem("token")); 

function App () {
  const {login} = useAuth();
  const {state ,dispatch} = useContext(AuthContext);
  const local = window.location.pathname;

  useEffect(() => {
    if(token === "123")
      login();
  }, [dispatch]);

  return (
    <Router>
      {/* Kiem tra de dieu huong khi nguoi dung truy cap vao index.html */}
      {local === '/'? (
        <Redirect to="/dashboard"></Redirect>
      ) : ''}
      <Switch>
      {routes.map(c => {
          const C = Components[c.component];
          return (
            <Route
              key={c.path}
              exact={c.exact}
              path={c.path}
              render={() => (
                c.isProtected?
                <PrivateRoute isAuthenticated={state.isAuthenticated}>
                  <Suspense fallback={null}>
                    <C />
                  </Suspense>
                </PrivateRoute> :
                <PublicRoute isAuthenticated={state.isAuthenticated}>
                <Suspense fallback={null}>
                  <C />
                </Suspense>
              </PublicRoute>
              )}
            />
          )
        //   : (<Route
        //       key={c.path}
        //       exact={c.exact}
        //       path={c.path}
        //       render={() => (
        //         <PublicRoute isAuthenticated={state.isAuthenticated}>
        //           <Suspense fallback={null}>
        //             <C />
        //           </Suspense>
        //         </PublicRoute>
        //       )}
        //     />
        //   ) 
        })}
        <Route path="*">
            <Suspense fallback={null}>       
              <NotFound />
            </Suspense>
          </Route>
      </Switch>
    </Router>
  )
}

export default App;
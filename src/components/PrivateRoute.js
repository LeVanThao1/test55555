import React, { Fragment, Suspense } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/userAuth";
// import { AppContext, SWITCH_AUTH_STATUS } from "./reducer";

const Menu = React.lazy(() => import(`./Menu`));

const PrivateRoute = props => {
  const { logout } = useAuth();
  if (!props.isAuthenticated) return <Redirect to="/login" />;
  if(JSON.parse(localStorage.getItem("token")) !== "123") { logout(); return <Redirect to="/" />};
  return (
    <Fragment>
      <Suspense fallback={null}>
        <Menu />
      </Suspense>
      <div className="private-content">{props.children}</div>
    </Fragment>
  );
};

export default PrivateRoute;
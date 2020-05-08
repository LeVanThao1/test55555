import React, { Fragment, Suspense, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { SWITCH_AUTH_STATUS } from "../context/authReducer";

const Menu = React.lazy(() => import(`./Menu`));

const PrivateRoute = props => {
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("token")) !== "123")
      dispatch({ type: SWITCH_AUTH_STATUS, payload: { status: false } })
  }, [dispatch])

  if (!props.isAuthenticated) return <Redirect to="/login" />;
  if(JSON.parse(localStorage.getItem("token")) !== "123") {  return <Redirect to="/login" />};
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
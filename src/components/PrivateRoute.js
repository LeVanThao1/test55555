import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
// import { AppContext, SWITCH_AUTH_STATUS } from "./reducer";
const PrivateRoute = props => {
  console.log(props);
  if (!props.isAuthenticated) return <Redirect to="/login" />;
  return (
    <Fragment>
      <div className="private-content">{props.children}</div>
    </Fragment>
  );
};

export default PrivateRoute;

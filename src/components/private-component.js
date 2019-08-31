import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const { isLogin } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLogin: state.user.isLogin
  }
}

export default connect(
  mapStateToProps
)(PrivateRoute)
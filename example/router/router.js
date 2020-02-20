import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default function Router({ component: Component, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <Component {...props}><Switch>{children}</Switch></Component>
      )}
    />
  );
}

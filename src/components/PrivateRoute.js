import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ ...Rest }) => {
  const state = useSelector((state) => state.auth.loaded);
  return state ? <Route {...Rest} /> : <Redirect to="/" />;
};

export default PrivateRoute;

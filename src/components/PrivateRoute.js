import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ ...Rest }) => {
  const state = useSelector((state) => state.auth);
  return state ? <Route {...Rest} /> : <Route {...Rest} />;
};

export default PrivateRoute;

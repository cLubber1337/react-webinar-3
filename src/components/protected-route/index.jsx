import React from 'react';
import {Navigate} from 'react-router-dom';
import useSelector from "../../hooks/use-selector";

export default function ProtectedRoute({ children}) {

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
  }));

  if (!select.isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
}

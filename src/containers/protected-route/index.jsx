import React from 'react';
import {Navigate} from 'react-router-dom';
import useSelector from "../../hooks/use-selector";

export default function ProtectedRoute({children}) {

  const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    isLoading: state.user.waiting,
  }));

  if (select.isLoading) {
    return <div>Loading...</div>
  }

  if (!select.isAuth) {
    return <Navigate to="/login"/>
  }
  return children;
}

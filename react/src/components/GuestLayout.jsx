import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { userStateContext } from '../contexts/ContextProvider';

export default function GuestLayout() {
  const {currentUser, userToken} = userStateContext();

  if (userToken) {
    return <Navigate to= "/" />
  }

  return (

    <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-50 w-auto"
            src="./images/basu_logo.png"
            alt="BASU Logo"
          />
          <Outlet />
        </div>
      </div>
    </div>
    
  )
}

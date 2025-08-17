import React from 'react'

const AuthLayout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
    <header></header>
    {children}
    </>
  )
}

export default AuthLayout
import React from 'react'

const AuthLayout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
    <header></header>
    {children}
    <footer>2025</footer>
    </>
  )
}

export default AuthLayout
import React from 'react'
import Footer from '@/components/Footer';

const AuthLayout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
    <header className='w-full flex flex-col justify-center items-center'>
      <picture>
        <img src="../../../public/icon.png" alt="logo" className="w-56 h-56 bg-red-500" />
      </picture>
    </header>
    {children}
    <Footer />
    </>
  )
}

export default AuthLayout
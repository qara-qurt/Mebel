import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

const Layout = ({children}) => {
  return (
    <>
        <Header/>
        <div className="wrapper">
            <div className="content">
                {children}
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Layout
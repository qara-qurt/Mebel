import React from 'react'

const LoginButton = ({title,color,textColor,onClick}) => {
  return (
    <button style={{backgroundColor:color,
        border:'none',
        borderRadius:50,color:textColor,
        paddingTop:7,
        paddingBottom:7,
        fontWeight:600}}
        onClick={onClick}
        >{title}</button>
  )
}

export default LoginButton
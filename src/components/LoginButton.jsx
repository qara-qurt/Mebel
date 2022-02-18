import React from 'react'

const LoginButton = ({title,color,textColor,onClick,width,disabled}) => {
  return (
    <button style={{
        backgroundColor:color,
        border:'none',
        borderRadius:50,color:textColor,
        paddingTop:7,
        paddingBottom:7,
        fontWeight:600,
        width:width,
        
      }
      }
      disabled={disabled}
        onClick={onClick}
        >{title}</button>
  )
}

export default LoginButton
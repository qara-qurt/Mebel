import React, { useState } from 'react'

const Input = ({name,type,placeholder,value,setValue}) => {
    const [error,setError] = useState('*Обязательое поле')
    const [dirty,setDirty] = useState(false)

    const blueHandler = () =>{
        setDirty(true)
    }

    const valueHandler = (e) =>{
        setValue(e)
        switch (name){
            case 'email':
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if(!re.test(String(e.target.value).toLowerCase())){
                    setError("*Некоректный email")
                }else{
                    setError("")
                }
                break;
            case 'password':
                setError("")
                break;
            case 'register_password':
                if(e.target.value.length < 6){
                    setError("*Пароль должен быть длиннее 6 символов")
                }else{
                    setError("")
                }
                break;
            case 'confirm_password':
                if(e.target.value.length < 6){
                    setError("*Пароль должен быть длиннее 6 символов")
                }else{
                    setError("")
                }
                break;
        }
            
    }

    return (
        <>
            {(dirty && error)&& <p style={{fontSize:12,margin:0,color:'#f34336'}}>{error}</p>}
            <input type={type} onBlur={blueHandler} placeholder={placeholder} value={value} onChange={valueHandler}/>
        </>
    )
}

export default Input
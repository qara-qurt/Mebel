import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const useAuth = () => {
    const {isAuth,user} = useSelector((state)=>state.auth)
    const [auth,setAuth] = useState();
    const [email,setEmail] = useState();
    useEffect(()=>{
        setAuth(isAuth)
        setEmail(user)
    },[isAuth,user])
    return  {"isAuth":auth,"email":email}
}

export default useAuth
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const useAuth = () => {
    const {isAuth,user,money} = useSelector((state)=>state.auth)
    const [auth,setAuth] = useState();
    const [email,setEmail] = useState();
    const [cash,setCash] = useState();
    useEffect(()=>{
        setAuth(isAuth)
        setEmail(user)
        setCash(money)
    },[isAuth,user])
    return  {"isAuth":auth,"email":email,"money":cash}
}

export default useAuth
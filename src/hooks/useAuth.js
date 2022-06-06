import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const { isAuth, user, role } = useSelector((state) => state.auth);
  const [auth, setAuth] = useState();
  const [email, setEmail] = useState();
  const [roles, setRoles] = useState();
  useEffect(() => {
    setAuth(isAuth);
    setEmail(user);
    setRoles(role);
  }, [isAuth, user, role]);
  return { isAuth: auth, email: email, role: roles };
};

export default useAuth;

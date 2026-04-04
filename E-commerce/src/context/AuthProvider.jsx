import { AuthContext } from "./AuthContext";
import {  useEffect, useState} from "react";
import axios from "axios";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(JSON.parse(savedUser));
  }
}, []);

  const handleAuthSuccess = (data)=>{
    const { accessToken, user: userData } = data;
    localStorage.setItem("token",accessToken)
    localStorage.setItem("user",JSON.stringify(userData.username))
    console.log(user);
    
    setUser(userData)
  }

  const signup = async (userData)=>{
    const res = await axios.post("http://localhost:3000/signup",userData)
    handleAuthSuccess(res.data);
  }
  const login = async (credentials)  =>{
    const res = await axios.post("http://localhost:3000/login",credentials) 
    handleAuthSuccess(res.data);
  }

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
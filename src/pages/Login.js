import React from 'react'
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {useAuth} from "../context/userAuth";
const Login = (props) => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  // if(state.isAuthenticated) {
  //   return <Redirect to='/'></Redirect>
  // }
  function onChange(e) {
    setPassword(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if(password === "123") {
      login();
      localStorage.setItem('token', JSON.stringify(password));
      setPassword('');
      return <Redirect to='/'></Redirect>
    }
    setPassword('');
  }

  // if(state.isAuthenticated) {
    
  // }

  return (
    <div>
      {/* 
      TODO: Your login page implementation
      */}
      <form onSubmit={onSubmit}>
        <input data-test='login__pwd' type='password' value={password} onChange={onChange}/>
        <button data-test='login__submit' type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
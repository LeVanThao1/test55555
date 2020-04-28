import React from 'react'
import { AppContext, SWITCH_AUTH_STATUS, appReducer } from "../reducer";
import * as jwt from 'jsonwebtoken'
import { useContext } from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {useAuth} from "../context/userAuth";
const Login = (props) => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');

  function onChange(e) {
    setPassword(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if(password === "123") {
      login();
      localStorage.setItem('token', JSON.stringify(jwt.sign(password, 'acexis')))
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
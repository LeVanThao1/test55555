import React, { useContext } from 'react'
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../context/authContext';
import { SWITCH_AUTH_STATUS } from '../context/authReducer';

const Login = (props) => {
  const { dispatch } = useContext(AuthContext);
  const [password, setPassword] = useState('');

  function onChange(e) {
    setPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(password === "123") {
      dispatch({ type: SWITCH_AUTH_STATUS, payload: { status: true } });
      localStorage.setItem('token', JSON.stringify(password));
      setPassword('');
      return <Redirect to='/'></Redirect>
    }
    setPassword('');
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input data-test='login__pwd' type='password' value={password} onChange={onChange}/>
        <button data-test='login__submit' type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
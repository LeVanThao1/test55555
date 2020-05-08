import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/authContext';
import { SWITCH_AUTH_STATUS } from '../context/authReducer';

const Menu = () => {
  const { dispatch } = useContext(AuthContext);
  const onClick = () => {
    localStorage.removeItem('token')
    dispatch({ type: SWITCH_AUTH_STATUS, payload: { status: false } })
  }
  return (
    <div>
      <h3>Menu</h3>
      <ul id='menu'>
        <li><Link to="/dashboard">/dashboard</Link></li>
        <li><Link to="/setting">/setting</Link></li>
        <li><Link to="/functions">/functions</Link></li>
        <li><Link to="/functions/foo">/functions/foo</Link></li>
        <li><Link to="/login"><button data-test='logout__btn' onClick={onClick}>Logout</button></Link></li>
      </ul>
    </div>
  )
}
export default React.memo(Menu);
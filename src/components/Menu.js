import React from 'react'
// import { AppContext, SWITCH_AUTH_STATUS } from "../reducer";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/userAuth';

const Menu = () => {
  const { logout} = useAuth();
  const onClick =() => {
    localStorage.removeItem('token')
    logout()
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
export default Menu;
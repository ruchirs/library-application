import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { UserContext } from '../../Context/UserContext'

function Navbar (props) {
    const { role } = useContext(UserContext)
  //remove user token to perform logout
    const removeToken = () => {
      localStorage.removeItem('token')
      window.location.href = '/'
    }

  return (
    <section className="navbar">
        <NavLink className="navbar-item" to='/dashboard'>Dashboard</NavLink>
        <NavLink className="navbar-item" to='/books'>Books List</NavLink>
        {role === 'admin' 
        ? <NavLink className="navbar-item" to='/add-book'>Add Books</NavLink>
        : null}
        
        <NavLink className="navbar-item" to='/' onClick={() => removeToken()}>Logout</NavLink>
    
  </section>
  )

}

export default Navbar;
import React from 'react'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentUser'))
 
  console.log(user)


  const logout = () => {
    localStorage.setItem('currentUser',null)
    window.location.href = "/"
  } 
  return (
    <nav className="navbar navbar-expand-lg bg-dark px-5 py-2" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      {!user ? <ul className="navbar-nav ">
        <li className="nav-item">
          <a className="nav-link "  href="/Register">Register</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">Login</a>
        </li>
      </ul> : <div className="navbar-nav dropdown  ">
  <button className="btn btn-nav btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {user.name}
  </button>
  <ul className="dropdown-menu ">
    <li><a className="dropdown-item" href="/profile">profile</a></li>
    <li><button className="btn-nav" onClick={logout}>logout</button></li>
    
  </ul>
</div>}
    </div>
  </div>
</nav>
  )
}

export default Navbar
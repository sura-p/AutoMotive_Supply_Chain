import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav class="teal">
            <div class="nav-wrapper">
                {/* <!-- <a href="#" class="brand-logo right">Logo</a> --> */}
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                    <li><Link to="/partfactory">Parts Factory</Link></li>
                    <li><Link to="/carfactory">Car Factory</Link></li>
                    <li><Link to="/dealer">Dealer</Link></li>
                </ul>
            </div>
        </nav>
  )
}

export default NavBar
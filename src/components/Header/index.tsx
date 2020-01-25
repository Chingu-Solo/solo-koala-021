import React from 'react'
import './style.css'

const Header : React.FC = () => <header>
    <div className='logo'>
        <span>Google</span> Fonts
    </div>
    <nav>
        <ul>
            <li><a href="/">CATALOG</a></li>
            <li><a href="/">FEATURED</a></li>
            <li><a href="/">ARTICLES</a></li>
            <li><a href="/">ABOUT</a></li>
        </ul>
    </nav>
</header>

export default Header
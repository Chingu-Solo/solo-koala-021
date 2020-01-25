import React, {FC} from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer : FC  = () => {
    return <footer>
        <small>Made with <span><FontAwesomeIcon icon={["fas", "heart"]}/></span> by Reedlex98 | 2020 | Chingu Pre-Work Project</small>
        <ul className="social">
            <li id="github" ><a rel="noopener noreferrer" target="_blank" href="https://github.com/reedlex98"><FontAwesomeIcon icon={["fab", "github"]} /></a></li>
            <li id="linkedin"><a rel="noopener noreferrer" target="_blank" href="https://linkedin.com/in/elder-louzada"><FontAwesomeIcon icon={["fab", "linkedin"]} /></a></li>
        </ul>
    </footer>
}

export default Footer
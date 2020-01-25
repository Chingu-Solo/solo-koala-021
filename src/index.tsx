import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { library} from '@fortawesome/fontawesome-svg-core'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {faSpinner , faList, faHeart, faGripHorizontal } from '@fortawesome/free-solid-svg-icons'

library.add(faGithub, faLinkedin, faSpinner, faList, faHeart, faGripHorizontal )

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

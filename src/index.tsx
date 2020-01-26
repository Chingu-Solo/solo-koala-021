import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { library} from '@fortawesome/fontawesome-svg-core'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {faSpinner , faList, faHeart, faGripHorizontal } from '@fortawesome/free-solid-svg-icons'

library.add(faGithub, faLinkedin, faSpinner, faList, faHeart, faGripHorizontal )

ReactDOM.render(<App />, document.getElementById('root'));

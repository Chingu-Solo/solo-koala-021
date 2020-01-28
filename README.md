Favorite Fonts
==============
### Dark Mode
![how the app looks like][app-screen-dark]
### Light Mode
![how the app looks like][app-screen-light]
### Mobile
![how the app looks like][mobile-dark]

Overview
--------

Favorite Fonts is a single page application that mimics some of the features of [Google Fonts][1]. You can search for several different fonts available in the Google Fonts API and see how they look like. 

Technologies
------------

- Typescript
- React

Features
--------

- Search fonts from Google Fonts API
- Type a sample text to see how it will look like in the font you've searched
- Choose the text size (several options to choose)
- Dark / Light Mode 
- Dark Mode ( Between 6PM and 5AM) / Light Mode (Between 6AM and 5PM)  - Local Time
- Grid / List Layout
- Responsive Design

Installation and How To Run
---------------------------
In order to get this application running you will need to have a Google Fonts API Key and replace the $YOUR_KEY (in the echo command) with your API Key value. In case you don't have this key, go to [this page][2] and generate one for you.

    git clone https://github.com/Chingu-Solo/solo-koala-021.git
    cd solo-koala-021
    npm install
    echo "REACT_APP_GOOGLE_API_KEY=$YOUR_KEY" > .env
    npm start

How to build and deploy
-------------

You will need to have node and yarn installed in your server. Then, you just need to execute the following commands to get build it, remember that you also need to [get your own Google Fonts API key][2] and replace the $YOUR_KEY with your actual API Key value.

    git clone https://github.com/Chingu-Solo/solo-koala-021.git
    cd solo-koala-021
    yarn
    echo "REACT_APP_GOOGLE_API_KEY=$YOUR_KEY" > .env.production
    yarn build

After doing this, yarn will generate a build folder for you. This is what your http-server must execute

Live version
------

You will need to have a modern browser and have it's javascript turned on. The application is available on Netlify, just follow this link - [Favorite Fonts][3] -, and you will get the app running

[app-screen-dark]: ./assets/img/app_dark_mode.png
[app-screen-light]: ./assets/img/app_light_mode.png
[mobile-dark]: ./assets/img/mobile_dark.png
[1]: https://fonts.google.com/
[2]: https://developers.google.com/fonts/docs/developer_api#APIKey
[3]: https://loving-joliot-f91dfe.netlify.com/
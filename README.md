Favorite Fonts
==============
### Dark Mode
![how the app looks like][app-screen-dark]
### Light Mode
![how the app looks like][app-screen-light]

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
- Choose the text size (12px, 24px, 36px or 48px) 
- Dark / Light Mode
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

Deploy
------

It will be available soon

[app-screen-dark]: ./assets/img/app_dark_mode.png
[app-screen-light]: ./assets/img/app_light_mode.png
[1]: https://fonts.google.com/
[2]: https://developers.google.com/fonts/docs/developer_api#APIKey
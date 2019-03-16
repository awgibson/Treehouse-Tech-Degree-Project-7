# Tech Degree Project 7
# A Static Node.js and Express Site

## Purpose
Create a project portfolio using Node.js, Express, JavaScript, and PUG templating.

## Exceeds Expectations Requirements
I have completed all of the exceeds expectations requirements.

1. Running npm start serves the app.
2. error.pug template has been created.
3. When the app is directed at a non-existent route, like /error/error, the app displays a user friendly error page in the browser that details the following:
    1. error.message
    2. error.status (I use error.statusCode)
    3. error.stack
4. Project has been customized. All changes are done in style.css starting on line 152.
    ```css
    body {
        background-color:#d8e7ff;
    }

    h1, h5, h6 {
        text-shadow: .75px .75px grey;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }   

    .thumbnail, .image {
        box-shadow: 2px 2px grey;
    }

    .error-message{
        font-style: italic;
        color: #000000;
    }

    .error-stack {
        font: .7rem Inconsolata, monospace;
        background-color: lightgray;
        padding: 25px;
    }
    ```
5. Changes detailed in the README.md file and the submission notes.
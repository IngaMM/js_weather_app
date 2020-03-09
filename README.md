WEATHER APP

By I. Mahle

A project of The Odin Project: https://www.theodinproject.com/lessons/weather-app

Instructions

1. Save all files and subfolders in one folder.
2. Open index.html with a browser.

Discussion
I used the following technologies: HTML (ES6), CSS and Javascript. The weather data are requested from an external API (https://openweathermap.org). The fetch command which gets back a promise is used to request the data from this API. The then-syntax is used to deal with the promise. Multiple "thens" are chained and error handling with catch is included.
DOM manipulation allows the display of a loading message while the request to the external API is in progress.
When the weather data are received successully DOM manipulations makes the loading message disappear and shows the data. When there is an error an error message is shown instead.
The background image is chosen in dependance of the weather forecast. The website is styled by using flexbox so that it can be viewed on devices with different screen sizes. Vendor prefixes assure that the website can be seen correctly on different browsers.

Requirements
Browser, internet access

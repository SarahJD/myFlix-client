# myFlix-client for the application myFlix WoMo (Women Movies)

## 1. Project description

This is the interface for the application myFlix WoMo, an application for movie enthusiasts providing data on movies directed by women. You can use this interface when making requests to, and receiving responses from, the REST API myFlix (see below).

It is a single page, responsive application (SPA) with routing, interactions and several interface views: for login, registration, movie details, genre details, director details, visibility filter.

Users can get information on movies, its genres and directors. Moreover, they can update their user information including their list of "Favorite Movies".

I included the possiblity to toggle movies in order to include resp. delete them from the "Favorite Movies" in both views: MovieCard and MovieView. Therefore I gave them their own component. The decision to add it at two different places made the development quite complicated especially because I had to send the information to the backend endpoints each time.

## 2. Screenshot

## 3. Hosted version of the app

The client-side of the project is deployed with Netlify: **URL**

## 4. Used Technologies

The complete web application including the server-side part of it was built using the MERN stack.

- This interface was built with **React**. I used class component, function components, and hooks. The app enables **Routing** based on react-router-dom. It targets the REST API endpoints with axios requests which I previously defined when writing the API.
- I wrote the app with **React Redux** for state management (hence respecting the Flux pattern).
- The application uses a mixture of pure **CSS** and **Bootstrap** as a UI library for styling and responsiveness.

## 5. Used API for the project

The project uses the [REST API](https://github.com/SarahJD/myFlix) I have built myself. The API delivers data stored in a MongoDB database and is itself built with Express and Node.js. It is deployed with Heroku: https://myflixwomo.herokuapp.com/

## 6. Design

The UI was inspired by old-fashioned movie theatres and this color palette which was adapted for contrast improvement: https://www.canva.com/colors/color-palettes/rose-and-gold/

https://fontawesome.com/icons/star?style=regular
https://fontawesome.com/icons/star?style=solid

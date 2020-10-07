This is a test project for Serveless App, using React and Firebase.
It's a chat app where you can:

- Sign-in with Google
- Create Chat Rooms with passwords
- Chat and Roll dices, writing (#1)d(#2)+(#3), where:
  - (#1) is the number of dices thrown
  - (#2) is the number of sides of the dices
  - (#3) is an extra addition to the total

Example:
`The mage cast a fireball with 8d6 of damage`, results on
`The mage cast a fireball with 8d6: [1, 1, 6, 1, 2, 6, 5, 2]=24 of damage`

A working version of the project can be seen at:

[https://zealous-saha-8447e0.netlify.app/](https://zealous-saha-8447e0.netlify.app/)

![Example_Image](https://github.com/adrianponce89/dicerooms/blob/develop/public/DiceRoomsExample.png)

# How to run this project locally

- Clone this repo
- Run `npm install`
- Create a Firebase project with Firestore, and set the corresponding configuration in `src/config/dbFirebase`
- Add a `.env` file on the root of the project with the next variables from Firebase config:

```
  REACT_APP_FIREBASE_API_KEY=<Your Firebase apiKey>
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<Your Firebase messagingSenderId>
  REACT_APP_FIREBASE_APP_ID=<Your Firebase appId>
```

- Run `npm run start` to start the react web server. This will open the landing page with login button

## Available Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br />

### `npm run deploy-rules`

Deploys any change on the rules to your firebase project

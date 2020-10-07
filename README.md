This is a test project for Serveless App, using React and Firebase
A working version of the project can be seen at:

[https://zealous-saha-8447e0.netlify.app/](https://zealous-saha-8447e0.netlify.app/)

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

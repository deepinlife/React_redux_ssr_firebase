import express from "express"
import cors from "cors"
import { renderToString } from "react-dom/server"
import { StaticRouter } from 'react-router-dom';
import App from '../shared/App.js';
import React from 'react';
import { Provider } from 'react-redux';
import store from "../shared/ReduxSetup/store/Navbar";
import * as admin from 'firebase-admin';
import SendHtml from '../shared/SendHtml';
var cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.static("public"));

let serviceAccount = require('./goalapp-74c1d-firebase-adminsdk-7zy3l-b6a211e35f.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://goalapp-74c1d.firebaseio.com'
});

let markup = null;
const context = {};
app.get("*(?<!/home)", (req, res, next) => {
  //res.clearCookie('session');
  markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )
  res.send(SendHtml({ markup }));
})

app.get('/home', (req, res, next) => {
  markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )
  admin.auth().getUser(req.cookies.session).then(response => {
    res.send(SendHtml({ markup }));
  }).catch(error => {
    res.redirect("/login");
  })

})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const functions = require('firebase-functions');
// admin.initializeApp();

// exports.detectEvilUsers = functions.firestore
//   .document('message/{msgId}')
//   .onCreate(async (doc, ctx) =>{
  
//   const filter = new filter();
//   const { text, uid } = doc.data();

//   if(filter.isProfane(text)) {

//     const cleaned = filter.clean(text);
//     await doc.ref.update({text: ` I got Banned for life for saying... ${ cleaned } `});

//     await db.collection('banned').doc(uid).set({});
//   }
//   });


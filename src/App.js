import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase';
// import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCmgFx_uTKECBZAT_r0fhVb_hqsxHj5fxE",
  authDomain: "react-chatapp-07.firebaseapp.com",
  projectId: "react-chatapp-07",
  storageBucket: "react-chatapp-07.appspot.com",
  messagingSenderId: "1068661745769",
  appId: "1:1068661745769:web:67685b73ca634a693c1af8",
  measurementId: "G-W40SWG2VTW"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}


export default App;

// import React, { useRef, useState } from 'react';
// import './App.css';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

// firebase.initializeApp( {
//   apiKey: "AIzaSyAnctcno1wDFfZI7zQ_v1JWJUDxCY2Fkww",
//   authDomain: "react-chatapp07.firebaseapp.com",
//   projectId: "react-chatapp07",
//   storageBucket: "react-chatapp07.appspot.com",
//   messagingSenderId: "1007771761984",
//   appId: "1:1007771761984:web:5090a0ae153128534c0ea5"
// })

// const auth = firebase.auth();
// const firestore = firebase.firestore();

// const [user] = useAuthState(auth);

// function App() {
//   return (
//     <div className="App">
//       <header>
//       <h1>⚛️🔥💬</h1>
//         <SignOut />
//       </header>
//       <section>
//         {user ? <ChatRoom /> : <SignIn />}
//       </section>
//     </div>
//   );
// }

// function SignIn() {
//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider);
//   }

//   return (
//     <>
//     <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
//     <p>Do not violate the community guidelines or you will be banned for life</p>
//     </>
//   )
// }

// function SignOut() {
//   return auth.currentUser && (

//     <button onClick={ () => auth.signOut() }>Sign Out </button>
//   )

// }

// function ChatRoom () {

//   const dummy = useRef();
//   const messagesRef = firestore.collection('message');
//   const query = messagesRef.irderBy('createdAt').limit(25);

//   const [messages] = useCollectionData(query, {idField: 'id'});

//   const [formValue, setFormValue] = useState('');

//   const sendMessage = async(e) => {
//     e.preventDefault();

//     const { uid, photoURL } = auth.currentUser;
  
//   await messagesRef.add( {
//       text: formValue,
//       createdAt: firebase.firestore.FieldValue.serverTimeStamp(),
//       ui,
//       photoURL 
//   })

//     setFormValue('');

//     dummy.current.scrollIntoView({ behavior: 'smooth'});

//   }

//   return(
//     <>
//     <main>
//       { messages && messages.map(msg => <ChatMessage key={ msg.id } message={ msg } /> )}
//     </main>
    
//     <div ref={dummy}>

//     </div>
//     <form onSubmit={ senMessage }> 
//       <input value={ formValue } onChange={ (e) => setFormValue(e.target.value) } />

//       <button  type="submit"> 🕊️ </button>
//     </form>
//     </>
//   )
// }

// function ChatMessage() {
//   const { text, uid } = props.message;
//   const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
//   return (
//     <div className={`message ${ messageClass }` }>
//       <img src={ photoUrl } />
//       <p>{ text } </p>
//     </div>
    
//   )

// }


// export default App;

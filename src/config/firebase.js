import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const configOptions = {
  apiKey: 'AIzaSyC3foqEfTZ02YzRzD4ME104fzWAwKRaCgo',
  authDomain: 'alchemist-e70cd.firebaseapp.com',
  databaseURL: 'https://alchemist-e70cd.firebaseio.com',
  projectId: 'alchemist-e70cd',
  storageBucket: 'alchemist-e70cd.appspot.com',
  messagingSenderId: '375309314555',
  appId: '1:375309314555:web:7c7224fb07e98e5e8b035e',
  measurementId: 'G-J5XQWYLC0J'
};

firebase.default.initializeApp(configOptions);

// utils
const db = firebase.default.firestore();
const auth = firebase.default.auth();

// collection references
const usersCollection = db.collection('users');
const projectMetadata = db.collection('projectMetadata');

export { db, auth, usersCollection, projectMetadata };

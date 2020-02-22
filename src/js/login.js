import * as firebase from 'firebase';
import { firebaseApp } from "./functions/firebase-app";
import {auth} from 'firebaseui';

const ui = new auth.AuthUI(firebaseApp.auth());

ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: 'settings.html'
  });
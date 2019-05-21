import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAEE_RH8qTc_LjV4hRVmECs7bLCs3XBC08",
  authDomain: "test-7ea39.firebaseapp.com",
  databaseURL: "https://test-7ea39.firebaseio.com",
  projectId: "test-7ea39",
  storageBucket: "test-7ea39.appspot.com",
  messagingSenderId: "1014815269529",
  appId: "1:1014815269529:web:94761538ac6d069b"
 };

var fire = firebase.initializeApp(config);

export default fire;

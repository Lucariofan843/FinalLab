import firebase from 'firebase/app'
import 'firebase/firestore';
import fbConfig from './FBConfig';

const firebaseApp = firebase.initializeApp(fbConfig);
const db = firebaseApp.firestore();
db.settings( ({
    timestampsInSnapshots: true
}));
export default db;
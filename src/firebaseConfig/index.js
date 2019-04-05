import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


//imported from app setting on webpage
const config = {
	{
		/*Confings from firebase settings here...*/
	}
};
firebase.initializeApp(config);

export default firebase;
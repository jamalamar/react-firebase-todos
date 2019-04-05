import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


//imported from app setting on webpage
const config = {
	{
		/*Firebase settings Config here...*/
	}
};
firebase.initializeApp(config);

export default firebase;
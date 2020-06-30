import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyDIgepirJanvbDJEKBvSbgtMlUyD3azS8Y',
	authDomain: 'crwn-db-2134f.firebaseapp.com',
	databaseURL: 'https://crwn-db-2134f.firebaseio.com',
	projectId: 'crwn-db-2134f',
	storageBucket: 'crwn-db-2134f.appspot.com',
	messagingSenderId: '550323669930',
	appId: '1:550323669930:web:e62f9e22aebd4e12f4b9d3',
	measurementId: 'G-E8M3NSCJW0',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const {displayName, email} = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('Error creating user', error.message);
		}
	}
	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add a student to Firestore
export const addStudentToFirestore = async (studentData) => {
	try {
		const studentsCollection = collection(db, "students");
		const docRef = await addDoc(studentsCollection, studentData);
		console.log("Student registered with ID:", docRef.id);
		return docRef.id; // Return student ID
	} catch (e) {
		console.error("Error adding student to Firestore:", e);
		throw new Error("Failed to register student");
	}
};

// Export db for use in other modules
export { db };

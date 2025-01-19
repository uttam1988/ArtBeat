import { db } from "@/lib/firebase"; // Import your Firebase setup
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
	try {
		const studentsCollection = collection(db, "students");
		const snapshot = await getDocs(studentsCollection);

		const students = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		return new Response(JSON.stringify(students), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: "Error fetching students data" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}

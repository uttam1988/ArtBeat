import { addStudentToFirestore } from "@/lib/firebase"; // Correctly import Firebase logic

export async function POST(req) {
	try {
		const { name, age, email, mobile, course, joiningDate } = await req.json();

		if (!name || !age || !email || !mobile || !course || !joiningDate) {
			return new Response(
				JSON.stringify({ message: "All fields are required" }),
				{ status: 400 },
			);
		}

		const studentData = {
			name,
			age,
			email,
			mobile,
			course,
			joiningDate,
			timestamp: new Date().toISOString(),
		};

		// Save student data to Firestore
		const studentId = await addStudentToFirestore(studentData);

		return new Response(
			JSON.stringify({
				message: "Student registered successfully",
				studentId,
				student: studentData,
			}),
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error in API Route:", error); // Log the error for debugging
		return new Response(
			JSON.stringify({
				message: "An error occurred while processing the request",
				error: error.message,
			}),
			{ status: 500 },
		);
	}
}

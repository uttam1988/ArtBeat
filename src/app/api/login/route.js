import { NextResponse } from "next/server";

export async function POST(req) {
	const { username, password } = await req.json();

	const admin = {
		username: "admin",
		password: "admin123",
	};

	if (username === admin.username && password === admin.password) {
		const token = "fake-jwt-token";
		return NextResponse.json({ message: "Login successful", token });
	} else {
		return NextResponse.json(
			{ message: "Invalid username or password" },
			{ status: 401 },
		);
	}
}

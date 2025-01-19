"use client"; // To ensure this component runs on the client-side in Next.js 13

import { useState } from "react";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				const data = await response.json();
				console.log("Login successful:", data);
				localStorage.setItem("token", data.token); // Save the token
				window.location.href = "/dashboard"; // Redirect to dashboard
			} else {
				const errorData = await response.json();
				setError(errorData.message || "An error occurred");
			}
		} catch (error) {
			setError("Failed to connect to the server");
			console.log(error);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white shadow-md rounded-lg p-8 max-w-sm w-full'>
				<h1 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
					Admin Login
				</h1>
				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					{error && <p className='text-red-500 text-sm'>{error}</p>}
					<div>
						<label
							htmlFor='username'
							className='block text-gray-700 font-medium mb-1'>
							Username
						</label>
						<input
							id='username'
							type='text'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Enter your username'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='password'
							className='block text-gray-700 font-medium mb-1'>
							Password
						</label>
						<input
							id='password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Enter your password'
							required
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

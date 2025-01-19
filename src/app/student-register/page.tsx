"use client"; // Ensures this code runs on the client-side in Next.js

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		email: "",
		mobile: "",
		course: "",
		joiningDate: "",
	});

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [formError, setFormError] = useState("");
	const router = useRouter(); // Initialize useRouter hook
	// Handle form field changes
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Show form error if there is any
		setFormError("");

		// Send the data to the API
		try {
			const response = await fetch("/api/student-register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (response.ok) {
				// Form submitted successfully
				setIsFormSubmitted(true);
				setFormData({
					name: "",
					age: "",
					email: "",
					mobile: "",
					course: "",
					joiningDate: "",
				});
				// Show a success message and redirect to the dashboard
				setTimeout(() => {
					router.push("/dashboard"); // Redirect to the dashboard after a brief delay
				}, 2000);
			} else {
				// Handle error in form submission
				setFormError(result.message);
			}
		} catch (error) {
			setFormError("An error occurred while submitting the form.");
			console.log(error);
		}
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
			<div className='bg-white shadow-md rounded-lg p-8 max-w-3xl w-full'>
				<h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
					Student Registration
				</h1>

				{isFormSubmitted && (
					<div className='mb-4 text-green-500 text-center'>
						<p>Registration successful!</p>
					</div>
				)}

				{formError && (
					<div className='mb-4 text-red-500 text-center'>
						<p>{formError}</p>
					</div>
				)}

				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					{/* Name */}
					<div>
						<label
							htmlFor='name'
							className='block text-gray-700 font-semibold'>
							Name
						</label>
						<input
							type='text'
							id='name'
							name='name'
							value={formData.name}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
						/>
					</div>

					{/* Age */}
					<div>
						<label
							htmlFor='age'
							className='block text-gray-700 font-semibold'>
							Age
						</label>
						<input
							type='number'
							id='age'
							name='age'
							value={formData.age}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
						/>
					</div>

					{/* Email */}
					<div>
						<label
							htmlFor='email'
							className='block text-gray-700 font-semibold'>
							Email
						</label>
						<input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
						/>
					</div>

					{/* Mobile Number */}
					<div>
						<label
							htmlFor='mobile'
							className='block text-gray-700 font-semibold'>
							Mobile Number
						</label>
						<input
							type='tel'
							id='mobile'
							name='mobile'
							value={formData.mobile}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
						/>
					</div>

					{/* Course Dropdown */}
					<div>
						<label
							htmlFor='course'
							className='block text-gray-700 font-semibold'>
							Course
						</label>
						<select
							id='course'
							name='course'
							value={formData.course}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'>
							<option value=''>Select a Course</option>
							<option value='player1'>Player 1</option>
							<option value='player2'>Player 2</option>
							<option value='player3'>Player 3</option>
						</select>
					</div>

					{/* Date of Joining */}
					<div>
						<label
							htmlFor='joiningDate'
							className='block text-gray-700 font-semibold'>
							Date of Joining
						</label>
						<input
							type='date'
							id='joiningDate'
							name='joiningDate'
							value={formData.joiningDate}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
						/>
					</div>

					<div className='mt-6 text-center'>
						<button
							type='submit'
							className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
							Register Student
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

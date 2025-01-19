"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Student {
	id: string;
	name: string;
	age: number;
	email: string;
	course: string;
	dateOfJoining: string;
}

const Dashboard = () => {
	const [students, setStudents] = useState<Student[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await fetch("/api/get-students");
				const data = await response.json();
				setStudents(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching students data:", error);
				setLoading(false);
			}
		};

		fetchStudents();
	}, []);

	return (
		<div className='p-6 flex flex-col'>
			<div className='w-full justify-end flex'>
				<Link href='/student-register'>
					<button className='bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600'>
						Register New Student
					</button>
				</Link>
			</div>
			<h1 className='text-2xl font-bold mb-4'>Student Dashboard</h1>
			{loading ? (
				<p>Loading students.....</p>
			) : (
				<div className='overflow-x-auto'>
					<table className='min-w-full border-collapse border border-gray-300'>
						<thead>
							<tr>
								<th className='border px-4 py-2'>Name</th>
								<th className='border px-4 py-2'>Age</th>
								<th className='border px-4 py-2'>Email</th>
								<th className='border px-4 py-2'>Course</th>
								<th className='border px-4 py-2'>Date of Joining</th>
							</tr>
						</thead>
						<tbody>
							{students.map((student) => (
								<tr key={student.id}>
									<td className='border px-4 py-2'>{student.name}</td>
									<td className='border px-4 py-2'>{student.age}</td>
									<td className='border px-4 py-2'>{student.email}</td>
									<td className='border px-4 py-2'>{student.course}</td>
									<td className='border px-4 py-2'>{student.dateOfJoining}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default Dashboard;

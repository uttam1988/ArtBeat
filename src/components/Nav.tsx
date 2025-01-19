import Link from "next/link";

export default function Nav() {
	return (
		<nav className='bg-blue-500 p-4'>
			<ul className='flex space-x-4 text-white'>
				<li>
					<Link href='/login'>Login</Link>
				</li>
				<li>
					<Link href='/dashboard'>Dashboard</Link>
				</li>
			</ul>
		</nav>
	);
}

import React from "react";
import { Link } from "react-router-dom";

const Input = ({ type, placeholder }) => {
	return (
		<input
			className="rounded-lg p-2 focus:outline-none"
			placeholder={placeholder}
			type={type}
		/>
	);
};

const Signup = () => {
	return (
		<div
			className="w-80 h-80 bg-violet-400 top-[50%] left-[50%] -translate-x-1/2
                       -translate-y-1/2 absolute rounded-lg"
		>
			<div className="flex flex-col justify-center items-center h-full gap-5">
				<Input type="text" placeholder="Username" />
				<Input type="password" placeholder="Password" />
				<Input type="password" placeholder="Confirm password" />
				<div className="flex flex-col gap-2">
					<button className="border border-slate-900 p-2 rounded-xl hover:bg-violet-300">
						Sign Up
					</button>
					<Link to="/login">
						<p className="hover:text-teal-300">Back to Login</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signup;

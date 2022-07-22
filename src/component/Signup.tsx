import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api.service";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const handleSignUp = async () => {
		if (!username || !password || !confirmPassword) {
			return;
		}

		if (password !== confirmPassword) {
			return;
		}

		try {
			const reqBody = {
				username,
				password,
			};
			const response = await api.post("/signup", reqBody);
			if (response.data) {
				navigate("/login");
			}
		} catch (error) {
			console.log("Error signing up:", error);
		}
	};

	return (
		<div
			className="w-80 h-80 bg-violet-400 top-[50%] left-[50%] -translate-x-1/2
                       -translate-y-1/2 absolute rounded-lg"
		>
			<div className="flex flex-col justify-center items-center h-full gap-5">
				<input
					className="rounded-lg p-2 focus:outline-none"
					placeholder="Username"
					type="text"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					className="rounded-lg p-2 focus:outline-none"
					placeholder="Password"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					className="rounded-lg p-2 focus:outline-none"
					placeholder="Confirm password"
					type="password"
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<div className="flex flex-col gap-2">
					<button
						onClick={handleSignUp}
						className="border border-slate-900 p-2 rounded-xl hover:bg-violet-300"
					>
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

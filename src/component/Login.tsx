import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../service/api.service";
import { sessionService } from "../service/session.service";

interface ButtonProps {
	text: string;
	onClick?: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className="border border-slate-900 p-2 rounded-xl hover:bg-violet-300"
		>
			{text}
		</button>
	);
};

const Input = ({ type, placeholder, onChange }) => {
	return (
		<input
			className="rounded-lg p-2 focus:outline-none"
			placeholder={placeholder}
			type={type}
			onChange={onChange}
		/>
	);
};

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleLogIn = async () => {
		const response = await apiService.login(username, password);
		if (response.status && response.status === 200) {
			sessionService.setToken(response.data);
			sessionService.setUsername(username);
			navigate("/");
		}
	};

	return (
		<div
			className="w-80 h-80 bg-violet-400 top-[50%] left-[50%] -translate-x-1/2
                       -translate-y-1/2 absolute rounded-lg"
		>
			<div className="flex flex-col justify-center items-center h-full gap-5">
				<Input
					type="text"
					placeholder="Username"
					onChange={handleUsernameChange}
				/>
				<Input
					type="password"
					placeholder="Password"
					onChange={handlePasswordChange}
				/>
				<div className="flex flex-col gap-2">
					<Button text="Log in" onClick={handleLogIn} />
					<Link to="/signup">
						<Button text="Sign up" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;

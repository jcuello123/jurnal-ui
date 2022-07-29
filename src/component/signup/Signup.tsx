import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../service/api.service";
import Modal, { ModalData } from "../modal/Modal";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [modalData, setModalData] = useState<ModalData>({
		message: "",
		success: false,
		show: false,
	});
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
			const response: any = await api.post("/signup", reqBody);
			if (response.data) {
				setUsername("");
				setPassword("");
				setConfirmPassword("");
				setModalData({
					message: "Account created!",
					show: true,
					success: true,
				});
			} else if (response?.response?.status === 409) {
				setModalData({
					message: "User already exists.",
					success: false,
					show: true,
				});
			}
		} catch (error) {
			setModalData({
				message: "Unable to sign up.",
				success: false,
				show: true,
			});
		}
	};

	return (
		<>
			<Modal modalData={modalData} setModalData={setModalData} />
			<div
				className="w-80 h-80 bg-[#284b63] top-[50%] left-[50%] -translate-x-1/2
				-translate-y-1/2 absolute rounded-lg shadow-custom"
			>
				<div className="flex flex-col justify-center items-center h-full gap-5">
					<input
						className="rounded-lg p-2 focus:outline-none text-black"
						placeholder="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						className="rounded-lg p-2 focus:outline-none text-black"
						placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						className="rounded-lg p-2 focus:outline-none text-black"
						placeholder="Confirm password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<div className="flex flex-col gap-2">
						<button
							onClick={handleSignUp}
							className="border-2 bg-white border-slate-900 p-2 rounded-xl hover:bg-[#d9d9d9] text-[#284b63]"
						>
							Sign Up
						</button>
						<Link to="/login">
							<p className="hover:text-[#d9d9d9] ">Back to Login</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;

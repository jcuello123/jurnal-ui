import React from "react";
import { useNavigate } from "react-router-dom";
import { sessionService } from "../service/session.service";

const Header = ({ user, setUser }) => {
	const navigate = useNavigate();

	const handleLogOut = () => {
		sessionService.clear();
		setUser(null);
		navigate("/login");
	};

	return (
		<div className="flex items-center justify-between min-h-[75px] p-1 text-[#F2E9E4]">
			<div className="flex items-center">
				<img
					className="rounded-[10%]"
					src="images/logo.png"
					width={85}
					alt="logo"
				/>
				<h1 className="text-4xl">jurnal</h1>
			</div>
			{user && (
				<div className="flex gap-2">
					<p>{user} |</p>
					<button onClick={handleLogOut} className="hover:text-cyan-400">
						Log out
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;

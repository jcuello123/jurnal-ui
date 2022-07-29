import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sessionService } from "../../service/session.service";
import { setUser } from "../../slice/userSlice";
import { RootState } from "../../store/store";

const Header = () => {
	const user = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogOut = () => {
		sessionService.clear();
		dispatch(setUser(""));
		navigate("/login");
	};

	return (
		<div className="flex items-center justify-between min-h-[75px] p-1 bg-[#284b63] text-white">
			<div className="flex items-center">
				<img
					className="rounded-[10%]"
					src="images/logo.png"
					width={85}
					alt="logo"
				/>
				<h1 className="text-4xl ">jurnal</h1>
			</div>
			{user.username && (
				<div className="flex gap-2 text-xl">
					<p>{user.username} |</p>
					<button
						onClick={handleLogOut}
						className="hover:text-[#d9d9d9] text-xl"
					>
						Log out
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;

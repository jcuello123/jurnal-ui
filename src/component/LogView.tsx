import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../service/session.service";

const LogView = () => {
	useEffect(() => {
		const token = getToken();
		if (!token) {
			navigate("/login");
		}
	}, []);

	const navigate = useNavigate();

	const [currentDate, setCurrentDate] = useState(
		new Date().toLocaleDateString("en-US")
	);
	const [currentText, setCurrentText] = useState("");

	return (
		<div
			className="flex flex-col justify-center items-center absolute 
					   top-[10%] left-[50%] -translate-x-1/2 text-white"
		>
			<div className="flex flex-col items-center">
				<p className="text-6xl">{currentDate}</p>
				<textarea
					className="text-center w-[800px] h-[400px] my-20 text-xl bg-[#282c34] resize-none"
					defaultValue={currentText}
				></textarea>
			</div>
		</div>
	);
};

export default LogView;

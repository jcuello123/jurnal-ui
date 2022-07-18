import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../service/api.service";
import { sessionService } from "../service/session.service";

interface Log {
	text: string;
	date: string;
}

const LogView = () => {
	const navigate = useNavigate();
	const [offset, setOffset] = useState(0);
	const [logs, setLogs] = useState<Log[]>([]);
	const emptyLog: Log = {
		text: "",
		date: new Date().toLocaleDateString("en-US"),
	};
	const [currentLog, setCurrentLog] = useState<Log>(emptyLog);

	useEffect(() => {
		const token = sessionService.getToken();
		const username = sessionService.getUsername();

		if (!token || !username) {
			navigate("/login");
			return;
		}

		const fetchLogs = async () => {
			const data: Log[] = await apiService.getLogs(offset, fetchLogs);

			if (data && data.length > 0) {
				setLogs(data);
				setCurrentLog(data[0]);
			}
		};

		fetchLogs();
	}, []);

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("en-US");
	};

	return (
		<div
			className="flex flex-col justify-center items-center absolute 
					   top-[10%] left-[50%] -translate-x-1/2 text-white"
		>
			<div className="flex flex-col items-center">
				<p className="text-6xl">{formatDate(currentLog.date)}</p>
				<textarea
					className="text-center w-[800px] h-[400px] my-20 text-xl bg-[#282c34] resize-none"
					defaultValue={currentLog.text}
				></textarea>
			</div>
		</div>
	);
};

export default LogView;

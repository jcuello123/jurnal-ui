import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../service/api.service";
import { sessionService } from "../service/session.service";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import moment from "moment";

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
		date: moment().format("YYYY-MM-DD"),
	};
	const [currentLog, setCurrentLog] = useState<Log>(emptyLog);
	const [index, setCurrentIndex] = useState(0);

	useEffect(() => {
		const token = sessionService.getToken();
		const username = sessionService.getUsername();

		if (!token || !username) {
			navigate("/login");
			return;
		}

		const fetchLogs = async () => {
			const data: Log[] = (await apiService.getLogs(offset, fetchLogs)) || [];
			console.log(data);

			if (data.length === 0 || data[0].date !== emptyLog.date) {
				data.unshift(emptyLog);
			}

			setLogs(data);
			setCurrentLog(data[0]);
		};

		fetchLogs();
	}, []);

	useEffect(() => {
		setCurrentLog(logs[index]);
	}, [index]);

	const handlePreviousLog = () => {
		if (index < logs.length - 1) {
			setCurrentIndex(index + 1);
		}
	};

	const handleNextLog = () => {
		if (index >= 1) {
			setCurrentIndex(index - 1);
		}
	};

	return (
		<div className="flex absolute top-[10%] left-[50%] -translate-x-1/2">
			<div>
				<button onClick={handlePreviousLog} className="text-4xl">
					{<FaAngleLeft />}
				</button>
			</div>
			<div className="flex flex-col justify-center items-center text-white">
				<div className="flex flex-col items-center">
					<p className="text-6xl">
						{currentLog ? currentLog.date : emptyLog.date}
					</p>
					{currentLog && currentLog.date === moment().format("YYYY-MM-DD") && (
						<textarea
							className="text-center w-[800px] h-[400px] my-20 text-xl bg-[#282c34] resize-none outline-none"
							defaultValue={currentLog ? currentLog.text : emptyLog.text}
							onChange={() => {}}
							autoFocus
							maxLength={1000}
							placeholder="Enter a log for today"
						></textarea>
					)}
					{currentLog && currentLog.date !== moment().format("YYYY-MM-DD") && (
						<div className="text-center w-[800px] h-[400px] my-20 text-xl">
							<p>{currentLog.text ? currentLog.text : ""}</p>
						</div>
					)}
				</div>
			</div>
			<div>
				<button onClick={handleNextLog} className="text-4xl">
					{<FaAngleRight />}
				</button>
			</div>
		</div>
	);
};

export default LogView;

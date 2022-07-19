import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../service/api.service";
import { sessionService } from "../service/session.service";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import moment from "moment";

export interface Log {
	text: string;
	date: string;
}

const LogView = () => {
	const navigate = useNavigate();
	const [offset, setOffset] = useState(0);
	const [logs, setLogs] = useState<Log[]>([]);
	const todaysLog: Log = {
		text: "",
		date: moment().format("YYYY-MM-DD"),
	};
	const [currentLog, setCurrentLog] = useState<Log>(todaysLog);
	const [index, setCurrentIndex] = useState(0);
	const [hasMoreData, setHasMoreData] = useState(true);
	const [isNewLog, setIsNewLog] = useState(false);

	useEffect(() => {
		const token = sessionService.getToken();
		const username = sessionService.getUsername();

		if (!token || !username) {
			navigate("/login");
			return;
		}

		const fetchLogs = async () => {
			const data: Log[] = (await apiService.getLogs(offset, fetchLogs)) || [];

			if (data.length === 0 || data[0].date !== todaysLog.date) {
				data.unshift(todaysLog);
			}

			setLogs(data);
			setCurrentLog(data[0]);
		};

		fetchLogs();
	}, []);

	useEffect(() => {
		setCurrentLog(logs[index]);
		if (index === logs.length - 1) {
			setOffset(offset + 3);
		}
	}, [index]);

	useEffect(() => {
		const fetchLogs = async () => {
			const data: Log[] = (await apiService.getLogs(offset, fetchLogs)) || [];

			if (data.length > 0) {
				setLogs(logs.concat(data));
			} else {
				setHasMoreData(false);
			}
		};
		if (hasMoreData && offset > 0) {
			fetchLogs();
		}
	}, [offset]);

	useEffect(() => {
		setIsNewLog(
			currentLog &&
				currentLog.date === moment().format("YYYY-MM-DD") &&
				!currentLog.text
		);
	}, [currentLog]);

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

	const handleSaveLog = async () => {
		const savedLog = await apiService.saveLog(
			currentLog.text,
			currentLog.date,
			handleSaveLog
		);

		if (savedLog) {
			setCurrentLog(savedLog);
			setOffset(0);
			setHasMoreData(true);
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
						{currentLog ? currentLog.date : todaysLog.date}
					</p>
					{isNewLog && (
						<textarea
							className="text-center w-[800px] h-[400px] my-20 text-xl bg-[#282c34] resize-none outline-none"
							defaultValue={""}
							onChange={(e) => {
								currentLog.text = e.target.value;
							}}
							autoFocus
							maxLength={1000}
							placeholder="Enter a log for today"
						></textarea>
					)}
					{!isNewLog && (
						<div className="text-center w-[800px] h-[400px] my-20 text-xl">
							<p>{currentLog && currentLog.text ? currentLog.text : ""}</p>
						</div>
					)}
					{isNewLog && <button onClick={handleSaveLog}>Save</button>}
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

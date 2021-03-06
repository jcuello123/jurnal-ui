import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api.service";
import { sessionService } from "../service/session.service";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import moment from "moment";
import Modal, { ModalData } from "./Modal";

export interface Log {
	text: string;
	date: string;
}

const LogView = ({ setUser }) => {
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
	const [modalData, setModalData] = useState<ModalData>({
		message: "",
		success: false,
		show: false,
	});

	useEffect(() => {
		const token = sessionService.getToken();
		const username = sessionService.getUsername();

		if (!token || !username) {
			navigate("/login");
			return;
		}

		setUser(username);

		const fetchLogs = async () => {
			try {
				const reqBody = { offset };
				const response = await api.post("/logs", reqBody);
				const data: Log[] = response.data || [];

				if (data.length === 0 || data[0].date !== todaysLog.date) {
					data.unshift(todaysLog);
				}

				setLogs(data);
				setCurrentLog(data[0]);
			} catch (error) {
				setModalData({
					message: "Unable to fetch logs.",
					success: false,
					show: true,
				});
			}
		};

		fetchLogs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setCurrentLog(logs[index]);
		if (index === logs.length - 1) {
			setOffset(offset + 3);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [index]);

	useEffect(() => {
		const fetchLogs = async () => {
			try {
				const reqBody = { offset };
				const response = await api.post("/logs", reqBody);
				if (response.data) {
					const data: Log[] = response.data;

					if (data.length > 0) {
						setLogs(logs.concat(data));
					} else {
						setHasMoreData(false);
					}
				}
			} catch (error) {
				setModalData({
					message: "Unable to fetch logs.",
					success: false,
					show: true,
				});
			}
		};
		if (hasMoreData && offset > 0) {
			fetchLogs();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		if (!currentLog.text) {
			return;
		}

		try {
			const reqBody = {
				text: currentLog.text,
				date: currentLog.date,
				username: sessionService.getUsername(),
			};

			const response = await api.post("/logs/save", reqBody);
			if (response.data) {
				const savedLog = response.data;
				setCurrentLog(savedLog);
				setOffset(0);
				setHasMoreData(true);
				setModalData({
					message: "Saved successfully!",
					success: true,
					show: true,
				});
			}
		} catch (error) {
			setModalData({
				message: "Unable to save log.",
				success: false,
				show: true,
			});
		}
	};

	return (
		<div className="flex justify-center">
			<Modal modalData={modalData} setModalData={setModalData} />
			<div className="flex mt-4">
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
		</div>
	);
};

export default LogView;

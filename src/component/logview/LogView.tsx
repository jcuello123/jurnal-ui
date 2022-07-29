import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api.service";
import { sessionService } from "../../service/session.service";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import moment from "moment";
import Modal, { ModalData } from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setUser } from "../../slice/userSlice";

export interface Log {
	text: string;
	date: string;
}

const emptyLog: Log = {
	text: "",
	date: moment().format("YYYY-MM-DD"),
};

const LogView = () => {
	const navigate = useNavigate();
	const [offset, setOffset] = useState(0);
	const [logs, setLogs] = useState<Log[]>([]);
	const [index, setCurrentIndex] = useState(0);
	const [hasMoreData, setHasMoreData] = useState(true);
	const [shouldFetch, setShouldFetch] = useState(true);
	const [isNewLog, setIsNewLog] = useState(false);
	const [displayText, setDisplayText] = useState("");
	const [currentLog, setCurrentLog] = useState(emptyLog);
	const [todaysLog, setTodaysLog] = useState(emptyLog);
	const dispatch = useDispatch();
	const [paperColor, setPaperColor] = useState("bg-paper-white");
	const paperColors = [
		"bg-paper-white",
		"bg-paper-blue",
		"bg-paper-red",
		"bg-paper-orange",
		"bg-paper-yellow",
		"bg-paper-green",
		"bg-paper-cyan",
		"bg-paper-purple",
		"bg-paper-pink",
	];

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

		handleRandomPaperColor();
		dispatch(setUser(username));

		const fetchLogs = async () => {
			if (shouldFetch) {
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
				setShouldFetch(false);
			}
		};

		fetchLogs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldFetch]);

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
		const newLog = currentLog?.date === todaysLog?.date && !currentLog?.text;
		setIsNewLog(newLog);
		setDisplayText(currentLog?.text);
	}, [currentLog]);

	useEffect(() => {
		setDisplayText(todaysLog?.text);
	}, [todaysLog]);

	const handlePreviousLog = () => {
		if (index < logs.length - 1) {
			handleRandomPaperColor();
			setTodaysLog(emptyLog);
			setCurrentIndex(index + 1);
		}
	};

	const handleNextLog = () => {
		if (index >= 1) {
			handleRandomPaperColor();
			setTodaysLog(emptyLog);
			setCurrentIndex(index - 1);
		}
	};

	const handleSaveLog = async () => {
		if (!todaysLog.text) {
			return;
		}

		try {
			const reqBody = {
				text: todaysLog.text,
				date: todaysLog.date,
				username: sessionService.getUsername(),
			};

			const response = await api.post("/logs/save", reqBody);
			if (response.data) {
				setOffset(0);
				setHasMoreData(true);
				setModalData({
					message: "Saved successfully!",
					success: true,
					show: true,
				});
				setShouldFetch(true);
			}
		} catch (error) {
			setModalData({
				message: "Unable to save log.",
				success: false,
				show: true,
			});
		}
	};

	const handleRandomPaperColor = () => {
		const idx = Math.floor(Math.random() * paperColors.length);
		setPaperColor(paperColors[idx]);
		console.log("idx:", idx, paperColors[idx]);
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
				<div className="flex flex-col justify-center items-center">
					<div className="flex flex-col items-center">
						<p className="text-6xl bg-[#353535] text-[#fffffc] rounded-md p-3 shadow-2xl">
							{currentLog?.date}
						</p>
						<textarea
							className={`${paperColor} text-center w-[800px] h-[450px] my-20 text-xl
									    resize-none outline-none attachment leading-8 p-8
										ggrounded-md shadow-2xl border-2 rounded-md border-black placeholder:text-black`}
							value={displayText}
							onChange={(e) => {
								const log: Log = {
									date: todaysLog.date,
									text: e.target.value,
								};
								setTodaysLog(log);
							}}
							autoFocus
							readOnly={!isNewLog}
							maxLength={1000}
							placeholder="Enter a log for today"
						></textarea>
						{isNewLog && (
							<button
								className="bg-[#353535] text-[#fffffc] p-2 rounded-md"
								onClick={handleSaveLog}
							>
								Save
							</button>
						)}
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

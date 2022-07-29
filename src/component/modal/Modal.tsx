import React, { Dispatch, SetStateAction, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";

export interface ModalData {
	message: string;
	success: boolean;
	show: boolean;
}

interface Props {
	modalData: ModalData;
	setModalData: Dispatch<SetStateAction<ModalData>>;
}

const Modal = ({ modalData, setModalData }: Props) => {
	const handleClose = () => {
		setModalData({ message: "", success: false, show: false });
	};

	useEffect(() => {
		if (modalData.show) {
			setTimeout(() => {
				setModalData({ message: "", show: false, success: false });
			}, 3000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalData]);

	return (
		<div
			id="modal"
			className={`${modalData.success ? "bg-[#CAFFBF]" : "bg-[#FFADAD]"}
            ${modalData.show ? "block" : "hidden"}
            w-96 h-14 rounded-xl absolute top-3 left-1/2 -translate-x-1/2 animate-slide-in z-10`}
		>
			<button onClick={handleClose} className="absolute right-2 top-1">
				<FaWindowClose />
			</button>
			<p className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
				{modalData.message}
			</p>
		</div>
	);
};

export default Modal;

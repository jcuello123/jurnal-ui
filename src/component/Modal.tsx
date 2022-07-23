import React, { Dispatch, SetStateAction } from "react";
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

	return (
		<div
			className={`${modalData.success ? "bg-green-500" : "bg-red-500"}
            ${modalData.show ? "block" : "hidden"}
            w-96 h-20 rounded-xl absolute top-3 left-1/2 -translate-x-1/2 animate-slide-in z-10`}
		>
			<button
				onClick={handleClose}
				className="absolute right-2 text-white top-1"
			>
				<FaWindowClose />
			</button>
			<p className="text-white absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
				{modalData.message}
			</p>
		</div>
	);
};

export default Modal;

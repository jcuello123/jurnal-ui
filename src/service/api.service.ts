import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = async (username: string, password: string) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/login`, {
			username,
			password,
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log("Error when logging in: ", error);
		return error;
	}
};

import axios from "axios";
import { sessionService } from "./session.service";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const login = async (username: string, password: string) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/login`, {
			username,
			password,
		});
		return response;
	} catch (error) {
		return error;
	}
};

const getLogs = async (offset: number, retryFunction: Function) => {
	try {
		const reqBody = {
			offset,
		};

		const options = {
			headers: {
				username: sessionService.getUsername(),
				token: sessionService.getToken(),
			},
		};

		const response = await axios.post(`${API_BASE_URL}/logs`, reqBody, options);

		return response.data;
	} catch (error) {
		await handleExpiredToken(error, retryFunction);
	}
};

const renewToken = async () => {
	const options = {
		headers: {
			username: sessionService.getUsername(),
			token: sessionService.getToken(),
		},
	};

	const response = await axios.post(`${API_BASE_URL}/token`, {}, options);
	return response.data;
};

const handleExpiredToken = async (error: any, retryFunction: Function) => {
	if (
		error.response &&
		error.response.status &&
		error.response.status === 401
	) {
		const token = await renewToken();
		if (token) {
			sessionService.setToken(token);
			await retryFunction();
		}
	}
};

export const apiService = {
	login,
	getLogs,
};

import axios, { Axios } from "axios";
import { sessionService } from "service/session.service";

const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080",
});

api.interceptors.request.use((req) => {
	req.headers = {
		username: sessionService.getUsername(),
		token: sessionService.getToken(),
		"Content-Type": "application/json",
		Accept: "application/json",
	};

	return req;
});

api.interceptors.response.use(
	(res) => res,
	async (err) => {
		if (err.response?.status === 401) {
			await handleExpiredToken();
			try {
				const response = await api.request(err.config);
				return response;
			} catch (error) {
				console.log("Error retrying request:", error);
			}
		}
		return err;
	}
);

const handleExpiredToken = async () => {
	try {
		const options = {
			headers: {
				username: sessionService.getUsername(),
				token: sessionService.getToken(),
			},
		};
		const response = await api.post("/token", {}, options);
		if (response.data) {
			const token = response.data;
			sessionService.setToken(token);
		}
	} catch (error) {
		console.log("Error when attempting token refresh:", error);
	}
};

export default api;

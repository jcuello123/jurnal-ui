const setToken = (token: string) => {
	sessionStorage.setItem("token", token);
};

const getToken = () => {
	return sessionStorage.getItem("token");
};

const setUsername = (username: string) => {
	sessionStorage.setItem("username", username);
};

const getUsername = () => {
	return sessionStorage.getItem("username");
};

const clear = () => {
	sessionStorage.clear();
};

export const sessionService = {
	setToken,
	getToken,
	setUsername,
	getUsername,
	clear,
};

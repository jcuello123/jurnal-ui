import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Login from "./component/Login";
import LogView from "./component/LogView";
import Signup from "./component/Signup";

function App() {
	const [user, setUser] = useState(null);

	return (
		<BrowserRouter>
			<Header user={user} setUser={setUser} />
			<Routes>
				<Route path="/" element={<LogView setUser={setUser} />} />
				<Route path="/login" element={<Login setUser={setUser} />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

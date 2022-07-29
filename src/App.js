import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/header/Header";
import Login from "./component/login/Login";
import LogView from "./component/logview/LogView";
import Signup from "./component/signup/Signup";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<LogView />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

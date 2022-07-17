import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Login";
import LogView from "./component/LogView";
import Signup from "./component/Signup";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LogView />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

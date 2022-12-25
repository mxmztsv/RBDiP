import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {Toaster} from "react-hot-toast"
import {useAuthContext} from "./context/AuthContext";
import {useEffect} from "react";

function App() {

	const {userData} = useAuthContext()

	const routes = useRoutes(userData)

	// useEffect(() => {
	// 	console.log('userData', userData)
	// }, [userData]);


	return (
		<div className="App">
			<Toaster
				position="bottom-left"
				reverseOrder={false}
			/>
			<Router>
				<div>
					{routes}
				</div>
			</Router>
		</div>
	);
}

export default App;

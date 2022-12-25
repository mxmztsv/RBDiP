import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";

function App() {

	const routes = useRoutes()

	return (
		<div className="App">
			<Router>
				<div>
					{routes}
				</div>
			</Router>
		</div>
	);
}

export default App;

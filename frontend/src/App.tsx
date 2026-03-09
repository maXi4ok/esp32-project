import ChartsComponent from "./components/ChartsComponent";
import CurrentDataComponent from "./components/CurrentDataComponent";
import HeaderComponent from "./components/HeaderComponent";

const App = () => {
	return (
		<div className="w-full">
			<HeaderComponent />
			<div className="flex flex-col items-center">
				<CurrentDataComponent />
				<ChartsComponent />
			</div>
		</div>
	);
};

export default App
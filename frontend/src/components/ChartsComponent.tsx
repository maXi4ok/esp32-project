import { useState, useEffect } from "react";
import type { IData } from "../models/IData";
import { getData } from "../services/api.service";
import HumidityChartComponent from "./Charts/HumidityChartComponent";
import TemperatureChartComponent from "./Charts/TemperatureChartComponent";

const ChartsComponent = () => {
	const [data, setData] = useState<IData[]>([]);
	const [period, setPeriod] = useState<string>("day");

	useEffect(() => {
		const fetchData = () => {
			getData(period).then((data) => setData(data));
		};
		fetchData();
		setInterval(fetchData, 360000);
	}, [period]);

	return (
		<div className="mt-2 ml-2 flex w-[85%] flex-col items-start">
			<p className="font-[Inter] text-[24px] font-extrabold text-[#6d7278] mb-1.5">All Time Charts: </p>
			<div className="flex h-14 w-[40%] lg:w-[13%] self-center flex-row items-center justify-evenly rounded-2xl bg-[#e5e5e5] p-1">
				<div className="group relative flex flex-col rounded-sm lg:w-[50%] p-1 hover:bg-[#d6d6d6] hover:top-[75%]">
					<p className=" self-center font-[Inter] font-extrabold text-[#6d7278]">{period.charAt(0).toUpperCase() + period.slice(1)}</p>
					<button onClick={() => { setPeriod("day") }} className="hidden font-[Inter] font-extrabold text-[#6d7278] transition duration-500 group-hover:block hover:bg-[#bdbdbd] hover:cursor-pointer">Day</button>
					<button onClick={() => { setPeriod("week") }} className="hidden font-[Inter] font-extrabold text-[#6d7278] transition duration-500 group-hover:block hover:bg-[#bdbdbd] hover:cursor-pointer">Week</button>
					<button onClick={() => { setPeriod("month") }} className="hidden font-[Inter] font-extrabold text-[#6d7278] transition duration-500 group-hover:block hover:bg-[#bdbdbd] hover:cursor-pointer">Month</button>
				</div>
				{/* <button className="h-8 w-22 rounded-lg bg-none font-extrabold text-[#6d7278] font-['Inter'] hover:bg-[#d4d4d4] active:bg-[#cbcbcb]">Previous</button>
				<button className="h-8 w-22 rounded-lg bg-none font-extrabold text-[#6d7278] font-['Inter'] hover:bg-[#d4d4d4] active:bg-[#cbcbcb]">Next</button> */}
			</div>
			<TemperatureChartComponent data={data} />
			<HumidityChartComponent data={data} />
		</div>
	);
};

export default ChartsComponent;
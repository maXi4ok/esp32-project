import { useState, useEffect } from "react";
import type { IData } from "../models/IData";
import { getData } from "../services/api.service";
import HumidityChartComponent from "./Charts/HumidityChartComponent";
import TemperatureChartComponent from "./Charts/TemperatureChartComponent";

const ChartsComponent = () => {
	const [data, setData] = useState<IData[]>([]);
	const [period, setPeriod] = useState<string>("day");
	const [isOpen, setIsOpen] = useState<boolean>(false)

	useEffect(() => {
		const fetchData = () => {
			getData(period).then((data) => setData(data));
		};
		fetchData();
		setInterval(fetchData, 360000);
	}, [period]);

	return (
		<div className="flex flex-col items-start mt-2 ml-2 w-[85%]">
			<p className="mb-1.5 font-[Inter] font-extrabold text-[#6d7278] text-[24px]">All Time Charts: </p>
			<div className="flex flex-row justify-evenly items-center self-center bg-[#e5e5e5] p-1 rounded-xl w-[40%] lg:w-[13%] h-14">
				<div className={`${isOpen ? 'top-[75%]' : ''} relative flex flex-col bg-[#d6d6d6] p-1 rounded-sm lg:w-[65%]`}>
					<p className={`flex flex-row self-center font-[Inter] font-extrabold text-[#6d7278]`}>{period.charAt(0).toUpperCase() + period.slice(1)} <button onClick={() => { setIsOpen(!isOpen) }}>{isOpen ? (<svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 13a.997.997 0 01-.707-.293L10 8.414l-4.293 4.293a.999.999 0 11-1.414-1.414l5-5a.999.999 0 011.414 0l5 5A.999.999 0 0115 13z" fill="#737373" /></svg>) : (<svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 14a.997.997 0 01-.707-.293l-5-5a.999.999 0 111.414-1.414L10 11.586l4.293-4.293a.999.999 0 111.414 1.414l-5 5A.997.997 0 0110 14z" fill="#737373" /></svg>)}</button></p>
					<button onClick={() => { setPeriod("day"); setIsOpen(false) }} className={`${isOpen ? 'block' : 'hidden'} hover:bg-[#bdbdbd] font-[Inter] font-extrabold text-[#6d7278] hover:cursor-pointer`}>Day</button>
					<button onClick={() => { setPeriod("week"); setIsOpen(false) }} className={`${isOpen ? 'block' : 'hidden'} hover:bg-[#bdbdbd] font-[Inter] font-extrabold text-[#6d7278] hover:cursor-pointer`}>Week</button>
					<button onClick={() => { setPeriod("month"); setIsOpen(false) }} className={`${isOpen ? 'block' : 'hidden'} hover:bg-[#bdbdbd] font-[Inter] font-extrabold text-[#6d7278] hover:cursor-pointer`}>Month</button>
				</div>
				{/* <button className="hover:bg-[#d4d4d4] active:bg-[#cbcbcb] bg-none rounded-lg w-22 h-8 font-['Inter'] font-extrabold text-[#6d7278]">Previous</button>
				<button className="hover:bg-[#d4d4d4] active:bg-[#cbcbcb] bg-none rounded-lg w-22 h-8 font-['Inter'] font-extrabold text-[#6d7278]">Next</button> */}
			</div>
			<TemperatureChartComponent data={data} />
			<HumidityChartComponent data={data} />
		</div>
	);
};

export default ChartsComponent;
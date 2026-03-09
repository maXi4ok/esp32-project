import { useEffect, useState } from "react";
import type { IData } from "../models/IData";
import { getCurrentData } from "../services/api.service";

const CurrentDataComponent = () => {
	const [currentData, setCurrentData] = useState<IData>()
	const fetchCurrentData = () => {
		getCurrentData()
			.then(data => setCurrentData(data))
	}
	useEffect(() => {
		fetchCurrentData()
		setInterval(fetchCurrentData, 60000);
	}, []);
	return (
		<div className="bg-[#e5e5e5] m-5 rounded-[10px] w-[85%] h-42">
			<p className="mt-2 ml-3 font-[Inter] font-extrabold text-[#6d7278] text-[24px]">Current:</p>
			<div className="flex flex-row">
				<svg className="ml-5" width="35px" height="35px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M570.8 742c0.5-2.9 0.9-5.8 0.9-8.8V418.5H458.4v314.6c0 3 0.4 5.9 0.9 8.8-34.3 19.5-57.5 56.3-57.5 98.5 0 62.6 50.7 113.3 113.3 113.3 62.6 0 113.3-50.7 113.3-113.3-0.1-42.2-23.3-79-57.6-98.4z" fill="#F59558" /><path d="M594.3 730.3V194.8c0-43.7-35.6-79.3-79.3-79.3s-79.3 35.6-79.3 79.3v535.4c-35.2 25.4-56.6 66.5-56.6 110.2 0 75 61 135.9 135.9 135.9s136-60.8 136-135.8c0-43.7-21.4-84.8-56.7-110.2zM515 931.1c-50 0-90.6-40.6-90.6-90.6 0-32.1 17.4-62.1 45.3-78.4 7-4 11.3-11.5 11.3-19.6v-40.8h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481V498h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-45.3h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481V226h11.3c6.3 0 11.3-5.1 11.3-11.3 0-6.3-5.1-11.3-11.3-11.3H481v-8.5c0-18.7 15.2-34 34-34 18.7 0 34 15.2 34 34v547.7c0 8.1 4.3 15.6 11.3 19.6 28 16.2 45.3 46.2 45.3 78.4 0.1 49.9-40.6 90.5-90.6 90.5z" fill="#00000" /></svg>
				<p className="ml-2 font-[Inter] font-extrabold text-[#6d7278] text-[23px]">Temperature: <span className="text-[#fca311]">{currentData?.temp ? currentData.temp : 'not_found'}°C</span></p>
			</div>
			<div className="flex flex-row">
				<svg className="ml-5" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.5C16.1012 21.5 19.5 18.4372 19.5 14.5714C19.5 12.1555 18.2672 9.71249 16.8732 7.70906C15.4698 5.69214 13.8515 4.04821 12.9778 3.21778C12.4263 2.69364 11.5737 2.69364 11.0222 3.21779C10.1485 4.04821 8.53016 5.69214 7.1268 7.70906C5.73282 9.71249 4.5 12.1555 4.5 14.5714C4.5 18.4372 7.8988 21.5 12 21.5Z" stroke="black" /><path d="M12 18C11.4747 18 10.9546 17.8965 10.4693 17.6955C9.98396 17.4945 9.54301 17.1999 9.17157 16.8284C8.80014 16.457 8.5055 16.016 8.30448 15.5307C8.10346 15.0454 8 14.5253 8 14" stroke="black" strokeLinecap="round" /></svg>
				<p className="ml-2 font-[Inter] font-extrabold text-[#6d7278] text-[23px]">Humidity: <span className="text-[#1e3057]">{currentData?.humid ? currentData.humid : 'not_found'}%</span> </p>
			</div>
			<div className="flex flex-row">
				<svg className="ml-5" fill="#000000" width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M12,6 C12.5128358,6 12.9355072,6.38604019 12.9932723,6.88337887 L13,7 L13,11.5857864 L14.7071068,13.2928932 C15.0976311,13.6834175 15.0976311,14.3165825 14.7071068,14.7071068 C14.3466228,15.0675907 13.7793918,15.0953203 13.3871006,14.7902954 L13.2928932,14.7071068 L11.2928932,12.7071068 C11.1366129,12.5508265 11.0374017,12.3481451 11.0086724,12.131444 L11,12 L11,7 C11,6.44771525 11.4477153,6 12,6 Z" />
				</svg>
				<p className="ml-2 font-[Inter] font-extrabold text-[#6d7278] text-[23px]" >Time: <span className="text-black">{currentData?.time ? currentData.time : 'not_found'}</span></p>
			</div>
		</div>
	);
};

export default CurrentDataComponent
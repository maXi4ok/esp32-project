import type { IData } from "../../models/IData";
import { Line } from "react-chartjs-2";
//@ts-ignore
import { Chart as ChartJS, defaults } from "chart.js/auto";
import type { FC } from "react";

type TemperatureChartComponentPropsType = {
	data: IData[];
}

const TemperatureChartComponent: FC<TemperatureChartComponentPropsType> = ({ data }) => {
	return (
		<div className="w-full">
			<Line height={`${window.innerWidth <= 480 ? '300' : ''}`} data={{
				labels: data.map(item => {
					if (item._id && item._id.day) {
						return `${item._id.day.toString().padStart(2,"0")}.${item._id.month.toString().padStart(2,"0")}`
					} else {
						const date = new Date(item.time * 1000);
						const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
						const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
						const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
						const month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
						return `${hours}:${minutes} | ${day}.${month}`
					}
				}),
				datasets: [{
					label: 'Temperature',
					data: data.map(item => item.temp ? item.temp : item.avgTemp),
					backgroundColor: "black",
					borderColor: "orange",
					borderWidth: 1.5,
					tension: 0.4
				}],

			}} options={{
				plugins: {
					title: {
						display: true,
						text: 'Temperature',
						font: {
							size: 24,
							weight: "bolder",
							family: "'Inter'"
						},
						color: "#6d7278"
					},

				},
				scales: {
					y: {
						min: 0,
						max: 30
					}
				},
			}} />
		</div>
	);
};

export default TemperatureChartComponent
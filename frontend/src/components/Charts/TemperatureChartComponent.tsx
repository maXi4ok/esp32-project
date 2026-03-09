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
			<Line data={{
				labels: data.map(item => {
					const date = new Date(item.time * 1000);
					const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
					const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
					const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
					const month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
					return `${hours}:${minutes} | ${day}.${month}`
				}),
				datasets: [{
					label: 'Temperature',
					data: data.map(item => item.temp),
					backgroundColor: "black",
					borderColor: "orange",
					borderWidth: 1.5,
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
			}} />
		</div>
	);
};

export default TemperatureChartComponent
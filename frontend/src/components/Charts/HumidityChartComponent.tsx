import type { FC } from 'react';
import type { IData } from '../../models/IData';
import { Bar } from 'react-chartjs-2';

type HumidityChartComponentPropsType = {
	data: IData[];
};

const HumidityChartComponent: FC<HumidityChartComponentPropsType> = ({ data }) => {
	return (
		<div className="w-full">
			<Bar data={{
				labels: data.map(item => {
					const date = new Date(item.time * 1000);
					const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
					const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
					const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
					const month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
					return `${hours}:${minutes} | ${day}.${month}`
				}),
				datasets: [{
					label: 'Humidity',
					data: data.map(item => item.humid),
					backgroundColor: "lightblue",
				}],
			}} options={{
				plugins: {
					title: {
						display: true,
						text: 'Humidity',
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

export default HumidityChartComponent
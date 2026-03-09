import type { IData } from "../models/IData"

export const getData = async (period: string): Promise<IData[]> => {
	return await fetch('https://esp32-project.onrender.com?period=' + period)
			.then(jsonData => jsonData.json())
}
export const getCurrentData = async (): Promise<IData> => {
	return await fetch('https://esp32-project.onrender.com/current')
			.then(jsonData => jsonData.json())
}
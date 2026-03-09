import type { IData } from "../models/IData"

export const getData = async (period: string): Promise<IData[]> => {
	return await fetch('http://localhost:3000?period=' + period)
			.then(jsonData => jsonData.json())
}
export const getCurrentData = async (): Promise<IData> => {
	return await fetch('http://localhost:3000/current')
			.then(jsonData => jsonData.json())
}
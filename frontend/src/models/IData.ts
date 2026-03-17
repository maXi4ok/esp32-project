export interface IData {
	temp: number,
	humid: number,
	time: EpochTimeStamp,
	_id?: {
		day: number,
		month: number
	},
	avgTemp?: number,
	avgHumid?: number,

}
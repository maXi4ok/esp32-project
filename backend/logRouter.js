const express = require('express');
const router = express.Router();
const Log = require('./Log');


router.get('/', async (req, res) => {
	const period = req.query.period || "day";
	if (period === "day") {
		const dayAgo = Date.now() / 1000 - 86400
		const result = await Log.find({ time: { $gte: dayAgo } }).sort({ time: 1 })
		res.json(result)
	} else if (period === "week") {
		const weekAgo = Date.now() / 1000 - 604800
		const result = await Log.aggregate([
			{
				$match: { time: { $gte: weekAgo } }
			},
			{
				$addFields: {
					formattedDate: { $toDate: { $multiply: ["$time", 1000] } }
				}
			},
			{
				$group: {
					_id: {
						day: { $dayOfMonth: "$formattedDate" },
						month: { $month: "$formattedDate" }
					},
					avgTemp: { $avg: "$temp" },
					avgHumid: { $avg: "$humid" }
				}
			},
			{
				$sort: { _id: 1 }
			}
		])
		res.json(result)
	} else if (period === "month") {
		const monthAgo = Date.now() / 1000 - 2629743
		const result = await Log.aggregate([
			{
				$match: { time: { $gte: monthAgo } }
			},
			{
				$addFields: {
					formattedDate: { $toDate: { $multiply: ["$time", 1000] } }
				}
			},
			{
				$group: {
					_id: {
						day: { $dayOfMonth: "$formattedDate" },
						month: { $month: "$formattedDate" }
					},
					avgTemp: { $avg: "$temp" },
					avgHumid: { $avg: "$humid" }
				}
			},
			{
				$sort: { _id: 1 }
			}
		])
		res.json(result)
	}
})

router.post('/', async (req, res) => {
	const { temp, humid, time } = req.body;
	await Log.create({
		temp,
		humid,
		time: Number(time),
	});
	console.log("new db log: ", {temp, humid, time});
	res.status(201).json({temp, humid, time});
});

let currentData = null;


router.get('/current', async (req, res) => {
	let result;
	if (!currentData) {
		const { temp, humid, time } = await Log.findOne().sort({ _id: -1 })
		const date = new Date(time * 1000);
		const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		result = {
			temp,
			humid,
			time: `${hours}:${minutes}`
		}
	}
	res.status(200).json(currentData || result);
})

router.post('/current', async (req, res) => {
	const newLog = req.body;
	currentData = newLog;
	console.log("new current log: ", currentData);
	res.status(201).json(newLog);
});

module.exports = router;


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
		// const result = await Log.find({ time: { $gte: weekAgo } }).sort({ time: 1 })
		const result = await Log.aggregate([
			{
				$match: { time: { $gte: weekAgo } }
			},
			{
				$group: {
					_id: {
						$substract: ["$time", { $mod: ["$time", 86400] }]
					},
					avgTemp: { $avg: "$temp" },
					avgHumid: { $avg: "$humid" }
				}
			},
			{
				$sort: {_id: 1}
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
				$group: {
					_id: {
						$substract: ["$time", { $mod: ["$time", 86400] }]
					},
					avgTemp: { $avg: "$temp" },
					avgHumid: { $avg: "$humid" }
				}
			},
			{
				$sort: {_id: 1}
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
	console.log("new db log: ", newLog);
	res.status(201).json(newLog);
});

let currentData = null;


router.get('/current', async (req, res) => {
	res.status(200).json(currentData || await Log.findOne().sort({ _id: -1 }));
})

router.post('/current', async (req, res) => {
	const newLog = req.body;
	currentData = newLog;
	console.log("new current log: ", currentData);
	res.status(201).json(newLog);
});

module.exports = router;


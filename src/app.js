const { default: axios } = require("axios");
const e = require("express");
const express = require("express");
const schedule = require("node-schedule");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
	res.status(200).send("hello" + process.env.VALUE_FROM_ENV);
});

const sendTelegramMessage = async (message) => {
	let sendMessage = "Vercel - Frasnym Personal Node\n\n";
	sendMessage = sendMessage.concat(message);

	const TELEGRAM_BOT_ID = process.env.TELEGRAM_BOT_ID;
	const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

	const telegramUrl = `https://api.telegram.org/${TELEGRAM_BOT_ID}/sendMessage?chat_id=-${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(
		sendMessage
	)}&parse_mode=html`;

	console.log(telegramUrl);

	try {
		const response = await axios.get(telegramUrl);

		return response.data;
	} catch (e) {
		return e.message;
	}
};

schedule.scheduleJob("00 * * * * *", async (fireDate) => {
	const message =
		"This job was supposed to run at " +
		fireDate +
		", but actually ran at " +
		new Date();

	const result = await sendTelegramMessage(message);
	console.log(result);
});

module.exports = app;

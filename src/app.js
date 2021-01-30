const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
	res.status(200).send(process.env.VALUE_FROM_ENV);
});

module.exports = app;

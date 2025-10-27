import log2discord from "../index.js";
import dotenv from "dotenv";
import { exit } from "process";
dotenv.config();

if (!process.env.WEBHOOK) exit();

const logger = new log2discord.Logger({
    webhook: process.env.WEBHOOK,
    name: "Logger",
    pid: true,
    host: true,
    dateTime: {
        timeZone: "America/New_York",
        locale: "en-US",
    },
    jsonPretty: true,
});

const sampleJSON = {
    foo: "This is an item within a valid JSON object",
    bar: 123,
    deep: {
        value: true,
    },
};

(async () => {
    await logger.error({
        title: "Error detected",
        message: "This is an error message ⛔",
        error: Error("Fake error"),
        json: sampleJSON,
    });
    await logger.warn({ title: "Warning detected", message: "This is a warning message ⚠", json: sampleJSON });
    await logger.debug({ title: "Debug detected", message: "This is a debug message 🐛", json: sampleJSON });
    await logger.info({ title: "Info detected", message: "This is an info message ℹ", json: sampleJSON });
    await logger.custom({
        type: "LOUD CUSTOM TYPE",
        color: 123,
        title: "Custom detected",
        message: "This is a custom message 🦄",
        json: sampleJSON,
    });
})();

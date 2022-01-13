import log2discord from '../index.js';
import dotenv from "dotenv";
import { exit } from 'process';
dotenv.config();

if (!process.env.WEBHOOK) exit();

const logger = new log2discord.Logger({
    webhook: process.env.WEBHOOK,
    name: "test2discord",
    pid: true,
    host: true,
    dateTime: {
        timeZone: "America/New_York",
        locale: "en-US"
    }
});

(async () => {
    await logger.error({ title: "Error detected", message: "This is an error message ⛔", error: Error("Fake error"), json: { valid: "json data", not: "invalid json data" } });
    await logger.warn({ title: "Warning detected", message: "This is a warning message ⚠", json: { valid: "json data", not: "invalid json data" } });
    await logger.debug({ title: "Debug detected", message: "This is a debug message 🐛", json: { valid: "json data", not: "invalid json data" } });
    await logger.info({ title: "Info detected", message: "This is an info message ℹ", json: { valid: "json data", not: "invalid json data" } });
    await logger.custom({ type: "LOUD CUSTOM TYPE", color: 123, title: "Custom detected", message: "This is a custom message 🦄", json: { valid: "json data", not: "invalid json data" } });
})();
import fetch from 'node-fetch';
import { hostname } from 'os';
import { DateTimeOptions, LoggerOptions, RequestOptions } from '../index';

/**
 * Logger object
 */
export default class Logger {
    /** @type {string} Discord webhook URL */
    private webhook: string;

    /** @type {string} Name of the application */
    private name?: string;

    /** @type {string | null} Application icon URL string */
    private icon?: string | null;

    /** @type {boolean} Show PID */
    private pid?: boolean;

    /** @type {boolean} Show hostname */
    private host?: boolean;

    /** @type {DateTimeOptions | false} Use false to disable displaying of time */
    private dateTime?: DateTimeOptions | false;

    /**
     * Construct the Logger class
     * @typedef {Object} LoggerOptions
     * @param {string} options.webhook The Discord webhook URL
     * @param {string} [options.name] Name of the application
     * @param {string| null} [options.icon] Application icon URL string
     * @param {boolean} [options.pid] Show application process ID
     * @param {boolean} [options.host] Show hostname
     * @param {DateTimeOptions | false} [options.dateTime] Timezone and locale information.  If false, then no time will be displayed
     * @param {locale} [options.dateTime.locale] Your locale (Eg. "en-US")
     * @param {timeZone} [options.dateTime.timeZone] Your timezone (Eg. "America/New_York")
     */
    constructor(options: LoggerOptions) {
        this.webhook = options.webhook;
        this.name = options.name || "log2discord";
        this.icon = options.icon || null;
        this.pid = options.pid;
        this.host = options.host;
        if (options.dateTime === undefined) {
            this.dateTime = {
                locale: "default",
                timeZone: "UTC",
            };
        } else if (options.dateTime === false) {
            this.dateTime === false;
        } else {
            this.dateTime = {
                locale: options.dateTime.locale ? options.dateTime.locale : "default",
                timeZone: options.dateTime.timeZone ? options.dateTime.timeZone : "UTC"
            };
        }
    }

    /**
     * Send a POST request to webhook using specified options
     * @param {RequestOptions} options Request options
     */
    async sendReq(options: RequestOptions): Promise<void> {
        fetch(this.webhook, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.name,
                avatar_url: this.icon,
                embeds: [
                    {
                        color: options.color,
                        author: {
                            name: options.type,
                        },
                        title: options.title,
                        description: await this.descriptionBuilder(options),
                        fields: await this.fieldsBuilder(),
                        footer: {
                            text: this.dateTime ? new Date().toLocaleString(this.dateTime.locale, { timeZone: this.dateTime.timeZone }) : null,
                            icon_url: this.icon
                        },
                    },
                ],
            })
        });
    }

    /**
     * Build the log description: include message, json, and error stack
     * @param options Request options
     * @returns Description string
     */
    private async descriptionBuilder(options: RequestOptions): Promise<string> {
        return `
            ${options.message ? options.message : ""}
            ${options.json ? `\`\`\`${JSON.stringify(options.json)}\`\`\`` : ""}${options.error ? `\`\`\`${options.error.stack}\`\`\`` : ""}
        `;
    }

    /**
     * Build the log fields: include hostname and process id (PID)
     * @returns Array of fields
     */
    private async fieldsBuilder(): Promise<({ name: string; value: string; inline: boolean; } | { name: string; value: number; inline: boolean; })[]> {
        const fields = [];
        if (this.host) {
            fields.push({
                name: 'Host',
                value: hostname(),
                inline: true
            });
        }
        if (this.pid) {
            fields.push({
                name: 'PID',
                value: process.pid,
                inline: true
            });
        }
        return fields;
    }

    /**
     * @typedef {Object} RequestOptions
     * @param {string} message Message to pass to log
     * @param {string} [type] Log level (Error, warn, debug, info)
     * @param {number} [color] Color defined by log level
     * @param {string} [title] Optional title to include in log
     * @param {Record<string|unknown>} [json] Optional json object to include in log
     * @param {Error} [error] Optional error object to include in log
     */    

    /** @type {RequestOptions} options - Request options */
    async error(options: RequestOptions): Promise<void> {
        options.type = "ERROR";
        options.color = 15158332;
        await this.sendReq(options);
    }

    /** @type {RequestOptions} options - Request options */
    async warn(options: RequestOptions): Promise<void> {
        options.type = "WARNING";
        options.color = 16159744;
        await this.sendReq(options);
    }

    /** @type {RequestOptions} options - Request options */
    async debug(options: RequestOptions): Promise<void> {
        options.type = "DEBUG";
        options.color = 40000;
        await this.sendReq(options);
    }

    /** @type {RequestOptions} options - Request options */
    async info(options: RequestOptions): Promise<void> {
        options.type = "INFO";
        options.color = 3447003;
        await this.sendReq(options);
    }

    /** @type {RequestOptions} options - Request options */
    async custom(options: RequestOptions): Promise<void> {
        options.type ? options.type : options.type = "CUSTOM";
        options.color ? options.color :  options.color = 12895428;
        await this.sendReq(options);
    }

}
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
     * @typedef {Object} options Logger options
     * @property {string} options.webhook The Discord webhook URL
     * @property {string} [options.name] Name of the application
     * @property {string| null} [options.icon] Application icon URL string
     * @property {boolean} [options.pid] Show application process ID
     * @property {boolean} [options.host] Show hostname
     * @property {DateTimeOptions | false} [options.dateTime] Timezone and locale information.  If false, then no time will be displayed
     * @property {locale} [options.dateTime.locale] Your locale (Eg. "en-US")
     * @property {timeZone} [options.dateTime.timeZone] Your timezone (Eg. "America/New_York")
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
     * @param options Request options
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
     * Log an error to webhook
     * @typedef {Object} options Request options
     * @property {string} options.message Message to be displayed
     * @property {string} [options.title] Title your message
     * @property {Record<string, unknown> | undefined} [options.json] Any valid json object
     * @property {Error} [options.error] Pass in your error object
     */
    async error(options: RequestOptions): Promise<void> {
        options.type = "ERROR";
        options.color = 15158332;
        await this.sendReq(options);
    }

    /**
     * Log a warning to webhook
     * @typedef {Object} options Request options
     * @property {string} options.message Message to be displayed
     * @property {string} [options.title] Title your message
     * @property {Record<string, unknown> | undefined} [options.json] Any valid json object
     * @property {Error} [options.error] Pass in your error object
     */
    async warn(options: RequestOptions): Promise<void> {
        options.type = "WARNING";
        options.color = 16159744;
        await this.sendReq(options);
    }

    /**
     * Log a debug message to webhook
     * @typedef {Object} options Request options
     * @property {string} options.message Message to be displayed
     * @property {string} [options.title] Title your message
     * @property {Record<string, unknown> | undefined} [options.json] Any valid json object
     * @property {Error} [options.error] Pass in your error object
     */
    async debug(options: RequestOptions): Promise<void> {
        options.type = "DEBUG";
        options.color = 40000;
        await this.sendReq(options);
    }

    /**
     * Log an info message to webhook
     * @typedef {Object} options Request options
     * @property {string} options.message Message to be displayed
     * @property {string} [options.title] Title your message
     * @property {Record<string, unknown> | undefined} [options.json] Any valid json object
     * @property {Error} [options.error] Pass in your error object
     */
    async info(options: RequestOptions): Promise<void> {
        options.type = "INFO";
        options.color = 3447003;
        await this.sendReq(options);
    }

}


// body: JSON.stringify({
//     username: this.app,
//     // avatar_url: 'https://www.starwindsoftware.com/blog/wp-content/uploads/2020/02/resultat-de-recherche-dimages-pour-azure-cdn.png',
//     embeds: [
//         {
//             // decimal number colour of the side of the embed
//             color: 15158332, // # E74C3C
//             // author
//             // - icon next to text at top (text is a link)
//             author: {
//                 name: "Error",
//             },
//             // embed title
//             // - link on 2nd row
//             title: options.title,
//             url:
//                 'https://gist.github.com/dragonwocky/ea61c8d21db17913a43da92efe0de634',
//             // thumbnail
//             // - small image in top right corner.
//             thumbnail: {
//                 url:
//                     'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
//             },
//             // embed description
//             // - text on 3rd row
//             description: `\`\`\`${options.error.stack}\`\`\``,
//             // custom embed fields: bold title/name, normal content/value below title
//             // - located below description, above image.
//             fields: [
//                 {
//                     name: 'field 1',
//                     value: 'value',
//                 },
//                 {
//                     name: 'field 2',
//                     value: 'other value',
//                 },
//             ],
//             // image
//             // - picture below description(and fields)
//             image: {
//                 url:
//                     'http://tolkiengateway.net/w/images/thumb/7/75/J.R.R._Tolkien_-_Ring_verse.jpg/300px-J.R.R._Tolkien_-_Ring_verse.jpg',
//             },
//             // footer
//             // - icon next to text at bottom
//             footer: {
//                 text: new Date().toLocaleString(this.locale, { timeZone: this.timeZone }),
//                 icon_url:
//                     'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
//             },
//         },
//     ],
// })
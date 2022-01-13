import Logger from './lib/logger.js';

export default {
    /**
     * @type {Logger} Default logger object
     */
    Logger
};

export {
    /**
     * @type {Logger} Explicit logger object
     */
    Logger
};

export interface LoggerOptions {
    /**
     * Discord webhook URL
     * ```js
     * webhook: "https://discord.com/api/webhooks/id/token"
     * ```
     * See [Discord webhooks documentation](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) for more information.
     */
    webhook: string;
    /**
     * Name of the application
     * ```js
     * name: Example App
     * ```
     */
    name?: string | "log2discord";
    /**
     * Application icon URL string
     * ```js
     * icon: "https://example.com/icon.png"
     * ```
     */
    icon?: string | null;
    /**
     * Show PID
     * ```js
     * pid: true, // Valid
     * 
     * pid: false,  // Valid
     * ```
     */
    pid?: boolean;
    /**
     * Show hostname
     * ```js
     * host: true, // Valid
     * 
     * host: false,  // Valid
     * ```
     */
    host?: boolean;
    /**
     * Specify locale information.
     * ```js
     * dateTime: {
     *  locale: string, // Eg. "en-US"
     *  timeZone: string // Eg. "America/New-York"
     * },
     * 
     * dateTime: false, // Disable diplaying of date and time
     * ```
     */
    dateTime?: DateTimeOptions | false;
}

export interface RequestOptions {
    /**
     * Message to pass to log
     * ```js
     * message: "This is an error message"
     * ```
     */
    message: string;
    /**
     * Type of log (ERROR, WARN, DEBUG, INFO, CUSTOM).  The type field will be ignored unless logger.custom(...) is used.
     * ```js
     * type: "CUSTOM TYPE" 
     * ```
     */
    type?: string;
    /**
     * Uses decimal format.  Color can only be defined when logger.custom(...) is used
     * ```js
     * color: 15252531
     * ```
     */
    color?: number;
    /**
     * Optional title to include in log
     * ```js
     * title: "An error has occured!"
     * ```
     */
    title?: string;
    /**
     * Optional json object to display in log
     * ```js
     * json: {
     *  valid: "json_data"
     * }
     * ```
     */
    json?: Record<string, unknown> | undefined;
    /**
     * Optional error stack to display in log
     * ```js
     * error: Error("Error message") // Custom error is valid
     * 
     * error: err // Error callback is valid
     * ```
     */
    error?: Error;
}

export interface DateTimeOptions {
    /**
     * Define a locale (Eg. "en-US")
     */
    locale?: string | "default";
    /**
     * Define a timezone (Eg. "America/New_York")
     */
    timeZone?: string | "UTC";
}
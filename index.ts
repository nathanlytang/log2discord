import Logger from './lib/logger';

export default {
    Logger
};

export {
    Logger
};

export interface LoggerOptions {
    /**
     * Discord webhook URL
     */
    webhook: string;
    /**
     * Name of the application
     */
    name?: string | "log2discord";
    /**
     *Application icon URL string
     */
    icon?: string | null;
    /**
     * Show PID
     */
    pid?: boolean;
    /**
     * Show hostname
     */
    host?: boolean;
    /**
     * Use false to disable displaying of time
     */
    dateTime?: DateTimeOptions | false;
}

export interface RequestOptions {
    /**
     * Message to pass to log
     */
    message: string;
    /**
     * Type of log (Error, warn, debug, info)
     */
    type?: string;
    /**
     * Color defined by type
     */
    color?: number;
    /**
     * Optional title to include in log
     */
    title?: string;
    /**
     * Optional json object to display in log
     */
    json?: Record<string, unknown> | undefined;
    /**
     * Optional error stack to display in log
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
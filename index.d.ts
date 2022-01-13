// declare namespace log2discord {
//     interface LoggerOptions {
//         /** @type {string} Discord webhook URL */
//         webhook: string;

//         /** @type {string} Name of the application */
//         name?: string | "log2discord";

//         /** @type {string | null} Application icon URL string */
//         icon?: string | null;

//         /** @type {boolean} Show PID */
//         pid?: boolean;

//         /** @type {boolean} Show hostname */
//         host?: boolean;

//         /** @type {DateTimeOptions | false} Use false to disable displaying of time */
//         dateTime?: DateTimeOptions | false;
//     }

//     interface RequestOptions {
//         message: string;
//         type?: string;
//         color?: number;
//         title?: string;
//         json?: Record<string, unknown> | undefined;
//         error?: Error;
//     }

//     interface DateTimeOptions {
//         locale?: string | "default";
//         timeZone?: string | "UTC";
//     }
// }
import fetch from 'node-fetch';

export default class Logger {
    constructor(options) {
        this.webhook = options.webhook;
        this.name = options.name || "log2discord";
        this.icon = options.icon || null;

        if (options.time === undefined) {
            this.time = true;
            this.locale = "default";
            this.timeZone = "UTC";
        } else if (options.time === false) {
            this.time === false;
        } else {
            this.time = true;
            this.locale = options.time.locale ? options.time.locale : "default";
            this.timeZone = options.time.timeZone ? options.time.timeZone : "UTC";
        }

    }

    async sendReq(options) {
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
                        description: options.description,
                        footer: {
                            text: this.time ? new Date().toLocaleString(this.locale, { timeZone: this.timeZone }) : null,
                        },
                    },
                ],
            })
        })
    }

    async descBuilder(options) {
        return `
            ${options.message ? options.message : ""}
            ${options.error ? `\`\`\`${options.error.stack}\`\`\`` : ""}
            ${options.json ? `\`\`\`${JSON.stringify(options.json)}\`\`\`` : ""}
        `;
    }

    async error(options) {
        options.type = "ERROR";
        options.color = 15158332;
        options.description = await this.descBuilder(options)
        await this.sendReq(options);
    }

    async warn(options) {
        options.type = "WARNING";
        options.color = 16159744;
        options.description = await this.descBuilder(options)
        await this.sendReq(options);
    }

    async debug(options) {
        options.type = "DEBUG";
        options.color = 40000;
        options.description = await this.descBuilder(options)
        await this.sendReq(options);
    }

    async info(options) {
        options.type = "INFO";
        options.color = 3447003;
        options.description = await this.descBuilder(options)
        await this.sendReq(options);
    }

}

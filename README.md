# log2discord
Log2discord is a logging module that logs events and errors to Discord.

## Install
```bash
# with npm
npm install log2discord
```

## Configuration
Log2discord requires the use of Discord webhooks.  Instructions on how to obtain a webhook url can be [found here](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

### Example configuration
```js
import log2discord from 'log2discord';
const logger = new log2discord.Logger({
    webhook: "https://discord.com/api/webhooks/<id>/<token>", // Discord webhook token
    icon: "https://linktoyourappicon.com/icon.png", // Will be used as profile photo
    name: "YourApp",
    pid: true,
    host: true,
    dateTime: {
        timeZone: "America/New_York",
        locale: "en-US"
    }
});
```

### Available configuration options
|Option|Type|Description|Notes|
|---|---|---|---|
|webhook|`string`|A valid Discord webhook URL|It is recommended to store your webhook using .env|
|icon|`string`|A valid image URL|Optional|
|name|`string`|Your application name|Optional|
|pid|`boolean`|Display process id|Optional|
|host|`boolean`|Display hostname|Optional|
|dateTime|`object` or `false`|Display date and time|Optional|
|timeZone|`string`|Your chosen timezone (Default is UTC)|Optional|
|locale|`string`|Your chosen locale|Optional|

## Usage

#### Error
```js
logger.error({
    title: "Error message title",
    message: "This is an error message 🛑",
    error: Error("Example error") // Can also be an error callback
})
```
![Error log example](/docs/examples/error.png "Error log example")

#### Warning
```js
logger.warn({
    title: "Warning message title",
    message: "This is a warning message 🚧",
})
```
![Warning log example](/docs/examples/warn.png "Warning log example")

#### Debug
```js
logger.debug({
    title: "Debug message title",
    message: "This is a debug message 🐛",
    json: {
        valid: "JSON object"
    }
})
```
![Debug log example](/docs/examples/debug.png "Debug log example")

#### Info
```js
logger.info({
    title: "Info message title",
    message: "This is an info message 🔤",
})
```
![Info log example](/docs/examples/info.png "Info log example")

#### Custom
```js
logger.custom({
    type: "CUSTOM",
    color: 123,
    title: "Custom message title",
    message: "This is a custom message 🦄",
    json: {
        valid: "JSON object"
    }
})
```
![Custom log example](/docs/examples/custom.png "Custom log example")

### Available logging options
|Option|Type|Description|Notes|
|---|---|---|---|
|message|`string`|A message to be logged||
|title|`string`|Title for your log message|Optional|
|type|`string`|A custom log level|(Optional).  Will only be parsed if logger.custom(...) is used|
|color|`number`|A color in decimal format|(Optional).  Will only be parsed if logger.custom(...) is used|
|json|`json`|A valid json object|Optional|
|error|`Error`|Log the error stack|Optional|

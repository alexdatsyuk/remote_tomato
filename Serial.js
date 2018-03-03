const SerialPort = require('serialport');

class Serial {
    constructor(path, options = {}) {
        this.path = path;
        this.options = options;
        this.port = new SerialPort(this.path, this.options, (error) => {
            if (error) {
                return console.log(`serial error on open: ${error}`);
            }

            console.log('serial port opened');
        });

        this.enableLogging();
    }

    enableLogging() {
        const parser = this.port.pipe(new SerialPort.parsers.Readline());

        parser.on('data', data => console.log(`serial data: ${data.toString()}`));
        parser.on('error', error => console.log(`serial error: ${error.toString()}`));

        return this;
    }

    sendMessage(message) {
        return new Promise((resolve, reject) => {
            this.port.write(message, (error) => {
                if (error) {
                    console.log(`serial error on write: ${err}`);
                    reject(error);
                }

                resolve();
            });
        });
    }
}

module.exports = Serial;

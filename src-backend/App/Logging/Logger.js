const fs = require('fs-extra');
const path = require('path');

module.exports = class Logger {
  constructor(isDevEnv, logsLocation, verbose) {
    this.isDevEnv = isDevEnv;
    this.verbose = verbose;
    this.fileStream = this.createFileWriteStream(logsLocation);
  }

  logInfo(logMessage, origin) {
    this.logMessage('INFO\t', logMessage, origin);
  }

  logWarn(logMessage, origin) {
    this.logMessage('WARN\t', logMessage, origin);
  }

  logError(logMessage, origin) {
    this.logMessage('ERROR\t', logMessage, origin);
  }

  logSuccess(logMessage, origin) {
    this.logMessage('SUCCESS', logMessage, origin);
  }

  logMessage(status, logMessage, origin) {
    let message = '';

    message += new Date().toUTCString();
    message += ' :: ';

    message += status;
    message += ' :: ';

    message += origin;
    message += ' :: ';

    message += logMessage;
    message += '\n';

    if (this.isDevEnv && this.verbose) {
      console.log(message);
    }

    this.logToFile(message);
  }

  logToFile(message) {
    this.fileStream.write(message, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  createFileWriteStream(logsLocation) {
    return fs.createWriteStream(path.join(logsLocation, 'applicationLog.log'));
  }

  destroy() {
    this.fileStream.end();
  }
};

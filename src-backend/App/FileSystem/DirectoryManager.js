const fs = require('fs-extra');
const path = require('path');
const Controller = require('../Parents/Controller');

module.exports = class DirectoryManager extends Controller {
  constructor(app, logger) {
    super(app, logger, 'DirectoryManager\t');

    this.documentsDir = path.join(this.app.getPath('documents'), 'Stremos');
    this.dataDir = path.join(this.documentsDir, 'data');
    this.preferencesDir = path.join(this.documentsDir, 'preferences');

    this.logDirectories();
  }

  logDirectories() {
    this.logInfo(`==========================================`);
    this.logInfo(`\t\tDirectories`);
    this.logInfo(`==========================================`);
    this.logInfo(`Logs: ${this.app.getPath('logs')}`);
    this.logInfo(`Documents: ${this.app.getPath('documents')}`);
    this.logInfo(`Temp: ${this.app.getPath('temp')}`);
    this.logInfo(`AppData: ${this.app.getPath('appData')}`);
    this.logInfo(`Cache: ${this.app.getPath('cache')}`);
    this.logInfo(`==========================================\n`);
  }

  ensureApplicationDirectoriesExist() {
    this.ensureDirectoryExists(this.documentsDir);
    this.ensureDirectoryExists(this.dataDir);
    this.ensureDirectoryExists(this.preferencesDir);
  }

  ensureDirectoryExists(targetDir) {
    this.logInfo(`Ensuring Directory Exists ${targetDir}`);
    try {
      fs.statSync(targetDir);
      this.logSuccess(`Directory Found!`);
      return true;
    } catch (err) {
      if (err.code === 'ENOENT') {
        this.logInfo(`Unable to find directory, making it now...`);
        if (this.makeDirectory(targetDir)) {
          this.logSuccess(`Created Directory ${targetDir}`);
          return true;
        } else {
          this.logError(`Unable to create directory.`);
          return false;
        }
      }
    }
  }

  makeDirectory(targetDir) {
    try {
      fs.mkdirSync(targetDir, { recursive: true });
      return true;
    } catch (err) {
      return err;
    }
  }
};

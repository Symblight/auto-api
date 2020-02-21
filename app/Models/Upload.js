'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Helpers = use('Helpers');
const path = require('path');
const crypto = require('crypto');

class Upload extends Model {
  static boot() {
    super.boot();
  }

  static getPathToFile(filename) {
    return [Helpers.publicPath('uploads')].join(path.sep);
  }

  static getSystemPath(filename) {
    return [this.getPathToFile(filename), filename].join(path.sep);
  }

  static getFileName(clientName, ext) {
    return `${crypto
      .createHash('md5')
      .update(Date.now() + clientName)
      .digest('hex')}.${ext}`;
  }
}

module.exports = Upload;

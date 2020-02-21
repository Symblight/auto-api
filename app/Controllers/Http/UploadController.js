'use strict';

const Upload = use('App/Models/Upload');
const mime = require('mime-types');
const path = require('path');
const fs = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');

class UploadController {
  async index({ response }) {
    return response.json({ status: true, data: 'It Works ' });
  }

  async upload({ request, response }) {
    const file = request.file('file', {
      size: '20mb',
    });

    let ext = mime.extension(`${file.type}/${file.subtype}`);

    if (!ext) {
      ext = path
        .extname(file.clientName)
        .split('.')
        .pop();
    }

    const name = Upload.getFileName(file.clientName, ext);

    const filePath = Upload.getSystemPath(name);
    const pathToCreate = Upload.getPathToFile(name);

    pathToCreate.split(path.sep).reduce((currentPath, folder) => {
      currentPath += folder + path.sep;
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath);
      }
      return currentPath;
    }, '');

    if (!fs.existsSync(pathToCreate)) {
      return response.error(500, 'unable_to_save_file');
    }

    try {
      fs.copyFileSync(file.tmpPath, filePath);
      fs.unlinkSync(file.tmpPath);
      await imagemin([`public/uploads/${name}`], {
        destination: 'public/uploads',
        plugins: [
          imageminMozjpeg({
            quality: 50,
          }),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
          imageminJpegtran({
            progressive: true,
          }),
        ],
      });
    } catch (e) {
      return response.error(500, 'unable_to_save_file');
    }

    const upload = await Upload.create({
      file_name: name,
      client_name: file.clientName,
      size: file.size,
    });

    return await Upload.find(upload.id);
  }

  async getPublicFile({ params, response }) {
    const file = await Upload.findOrFail(params.uploadId);

    response.attachment(Upload.getSystemPath(file.file_name), file.client_name);
  }
}

module.exports = UploadController;

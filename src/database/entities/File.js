const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  size: Number,
  mimetype: String
});

const FileModel = mongoose.model("File", FileSchema);

module.exports = {
  FileModel, FileSchema
};
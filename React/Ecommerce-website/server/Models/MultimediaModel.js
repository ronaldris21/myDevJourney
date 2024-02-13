import mongoose from "mongoose";

const multimediaSchema = new mongoose.Schema({
  data: Buffer,
  mimetype: String,
},
{
  timestamps: true,
});

const MultimediaModel = mongoose.model("Multimedia",multimediaSchema);

export {multimediaSchema, MultimediaModel};
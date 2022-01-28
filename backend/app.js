import express from "express";
import cors from "cors";
import multer from "multer";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import fs from "fs";

import dotenv from "dotenv";
//reference to ffmpeg lib
const ffmpegInstance = createFFmpeg({ log: true });
//waits until the lib is done loading
let ffmpegLoadingPromise = ffmpegInstance.load();

async function getFFmpeg() {
  if (ffmpegLoadingPromise) {
    await ffmpegLoadingPromise;
    ffmpegLoadingPromise = undefined;
  }

  return ffmpegInstance;
}
const app = express();

dotenv.config();

const sign = async (url, fullName, location, publication) => {
  const videoData = url;
  const ffmpeg = await getFFmpeg();
  const inputFileName = "input-video";
  const outputFileName = `output-video.mp4`;
  const fixed = `output-fixed.mp4`;
  let outputData = null;
  ffmpeg.FS("writeFile", inputFileName, await fetchFile(url));

  await ffmpeg.run(
    "-i",
    inputFileName,
    "-metadata",
    `copyright="${fullName}"`,
    "-metadata",
    `description="${location}"`,
    "-metadata",
    `network="${publication}"`,
    outputFileName
  );
  await fs.promises.writeFile(
    "./test8.mp4",
    ffmpeg.FS("readFile", outputFileName)
  );
  process.exit(0);
};

sign(
  "http://res.cloudinary.com/thankloop/video/upload/v1643120903/jqqkmgqz6hyzjxsxah6l.mp4",
  "Massy",
  "MTL",
  "Youtube"
);
// app.set("view engine", "ejs");

// app.use("/", require("./routes/sign"));
const PORT = process.env.PORT || 5000;

const upload = multer({
  storage: multer.memoryStorage(),
  //limits: { fileSize: 100 * 1024 * 1024 },
});

app.use(cors());
app.listen(PORT, () => {
  console.log(`Listening on Port : ${PORT}`);
});

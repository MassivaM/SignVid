import express from "express";
import cors from "cors";
import multer from "multer";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import fs from "fs";
import createHmac from "create-hmac";
import dotenv from "dotenv";
import crypto from "crypto";
import FormData from "form-data";
import fetch from "node-fetch";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
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
var finalHex = "";
dotenv.config();
var newurl = "";

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

  //create checksum (SHA-256) and save it in a file of the same name - kept in the backend for now but when scaling it would be in a secured database
  const fileBuffer = fs.readFileSync("./output.mp4");
  const hash = crypto.createHash("sha256");
  finalHex = hash.update(fileBuffer).digest("hex");
  console.log(finalHex);
  await fs.promises.writeFile(
    `${finalHex}.mp4`,
    ffmpeg.FS("readFile", outputFileName)
  );
  cloudinary.v2.uploader.upload(
    `${finalHex}.mp4`,
    {
      resource_type: "video",

      chunk_size: 6000000,
    },
    function (error, result) {
      newurl = result.url;
      console.log(finalHex);
      console.log(newurl);
    }
  );
};

const PORT = process.env.PORT || 5000;

const upload = multer({
  storage: multer.memoryStorage(),
  //limits: { fileSize: 100 * 1024 * 1024 },
});
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.post("/sign", function (request, response) {
  console.log(request.body.url);
  console.log(request.body.fullName);
  console.log(request.body.location);
  console.log(request.body.publication);
  sign(
    request.body.url,
    request.body.fullName,
    request.body.location,
    request.body.publication
  );
});
app.post("/sendurl", function (req, res) {
  var results = newurl;
  res.send(JSON.stringify(results));
});
app.listen(PORT, () => {
  console.log(`Listening on Port : ${PORT}`);
});

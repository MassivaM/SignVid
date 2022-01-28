exports.sign = (req, res) => {
  res.send("hello ayo hey");
  var ffmpeg = require("ffmpeg");
  console.log("allo");
  try {
    var process = new ffmpeg(
      "http://res.cloudinary.com/thankloop/video/upload/v1643120903/jqqkmgqz6hyzjxsxah6l.mp4"
    );
    console.log("allo");
    process.then(
      function (video) {
        // Video metadata
        console.log("this is the metadata");
        console.log(video.metadata);
        // FFmpeg configuration
        console.log(video.info_configuration);
      },
      function (err) {
        console.log("Error: " + err);
      }
    );
  } catch (e) {
    console.log(e.code);
    console.log(e.msg);
  }
};

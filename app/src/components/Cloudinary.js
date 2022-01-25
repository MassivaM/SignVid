import React, { useState } from "react";
import UploadDone from "./UploadDone.js";
import "../scss/Cloudinary.scss";
export default function Cloudinary({ uploaded, UploadComplete }) {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "signvid");
    data.append("cloud_name", "thankloop");
    fetch(" https://api.cloudinary.com/v1_1/thankloop/video/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
    UploadComplete();
  };
  return (
    <div>
      {uploaded == true ? (
        <UploadDone url={url} />
      ) : (
        <div style={{ justifyContent: "center", alignContent: "center" }}>
          <label className="button2">
            Click to select your video
            <input
              className="custom-file-input"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </label>

          <br></br>
          <button className="button" onClick={uploadImage}>
            Upload
          </button>
        </div>
      )}
    </div>
  );
}

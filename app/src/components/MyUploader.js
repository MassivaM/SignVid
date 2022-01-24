//Source : https://react-dropzone-uploader.js.org/docs/examples

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import UploadDone from "./UploadDone.js";
import "../scss/Dropzone.scss";
import React, { useState } from "react";
const Input = () => {
  return (
    <p className="drag">Drag and drop your video here, or click to select</p>
  );
};
export default function MyUploader({ uploaded, UploadComplete }) {
  const [vid, setVid] = useState();

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    const reader = new FileReader();
    reader.onload = (e) => {
      // saveBase64AsFile(e.target.result, files[0].meta.name);
      setVid(e.target.result);
    };
    allFiles.forEach((f) => f.remove());
    //UploadComplete();
    console.log("is upluaded tru" + uploaded);
  };

  return (
    <div>
      {console.log("this is uploaed" + uploaded)}
      {uploaded == true ? (
        <UploadDone video={vid} />
      ) : (
        <div>
          <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            accept="video/*"
            maxFiles={1}
            multiple={false}
            inputContent={Input}
            styles={{
              padding: 0,
              margin: 0,
              dropzone: {
                width: 500,
                height: 300,
                borderWidth: "2px",
                borderRadius: "1px",
                borderColor: "#2872fb",
                borderStyle: "dashed",
                // background: "#cddfff",
                padding: 0,
                margin: 0,
              },
              dropzoneActive: { borderColor: "green", padding: 0 },
              dzuDropzone: { padding: 0 },
            }}
          />
        </div>
      )}
    </div>
  );
}

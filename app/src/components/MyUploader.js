//Source : https://react-dropzone-uploader.js.org/docs/examples

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import "../scss/Dropzone.scss";
const Input = () => {
  return (
    <p className="drag">Drag and drop your video here, or click to select</p>
  );
};
const MyUploader = () => {
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
    allFiles.forEach((f) => f.remove());
  };

  return (
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
  );
};

export default MyUploader;

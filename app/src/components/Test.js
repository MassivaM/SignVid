import Dropzone from "react-dropzone-uploader";
import React from "react";
import axios from "axios";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};
const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }

  onDrop(files) {
    this.setState({
      files: files.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    });

    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);

      return axios.post("https://httpbin.org/post", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
    });

    axios.all(uploaders).then(() => {
      // remove files once they've all been uploaded
      this.setState({ files: [] });
    });
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach((file) => URL.revokeObjectURL(file.preview));
  }

  render() {
    const { files } = this.state;

    const thumbs = files.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    ));

    return (
      <section>
        <Dropzone
          onDrop={this.onDrop.bind(this)}
          accept="image/*,audio/*,video/*"
          maxFiles={1}
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
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drop files here</p>
            </div>
          )}
        </Dropzone>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    );
  }
}

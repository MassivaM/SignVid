import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import success from "../assets/success.svg";
import "../scss/Cloudinary.scss";
import "../scss/success.scss";
import axios from "axios";
import download from "downloadjs";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
  margin: 0,
};

export default function BasicModal(open, handleClose) {
  const [url, setUrl] = React.useState("");
  const handleUrl = (url2) => setUrl(url2);
  function downloadFile() {
    axios.post("http://localhost:5000/sendurl").then(({ data }) => {
      console.log(data);
      handleUrl(data);
      console.log("this is the url " + url.type);
      setTimeout(500);
      download(url);
    });
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={0}>
            <Grid xs={6}>
              <img className="img" src={success} />
            </Grid>
            <Grid xs={6}>
              <p className="title3">Success!</p>

              <button className="button3" onClick={downloadFile}>
                Download
              </button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

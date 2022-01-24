import "./scss/App.scss";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Title from "./components/Title.js";
import leftwave from "./assets/left-wave.svg";
import rightwave from "./assets/right-wave.svg";
import Dropzone from "./components/MyUploader.js";
import UploadDone from "./components/UploadDone.js";
import SmallTitle from "./components/SmallTitle.js";
import React, { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));
export default function App() {
  const [uploaded, setUploaded] = useState(false);

  function UploadComplete() {
    setUploaded(true);
  }

  return (
    <Grid container spacing={0}>
      <Grid xs={3}>
        <div style={{ textAlign: "left" }}>
          <img className="leftwave" src={leftwave} />
        </div>
      </Grid>
      <Grid xs={6}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <Grid xs={6}>{uploaded == false ? <Title /> : <SmallTitle />}</Grid>
          <Grid xs={12}>
            <Dropzone uploaded={uploaded} UploadComplete={UploadComplete} />
          </Grid>
          <Grid xs={6}></Grid>
        </Grid>
      </Grid>
      <Grid xs={3}>
        <div style={{ textAlign: "right" }}>
          <img className="rightwave" src={rightwave} />
        </div>
      </Grid>
    </Grid>
  );
}

import "../scss/Title.scss";
import video1 from "../assets/test.mp4";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, Field, Form } from "formik";

import React, { useState, useEffect } from "react";
import SuccesModal from "./Success-Modal.js";
import download from "js-file-download";
import "../scss/UploadDone.scss";

export default function UploadDone({ url }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      location: "",
      publication: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {}, []);
  return (
    <div style={{ alignContent: "center", justifyContent: "center" }}>
      {open && <SuccesModal />}
      <video
        width="500"
        height="300"
        style={{ paddingLeft: "0%" }}
        controls
        key={url}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support HTML video.
      </video>
      <Formik
        initialValues={{
          fullName: "",
          location: "",
          publication: "",
        }}
        onSubmit={async (values) => {
          handleLoading();
          await new Promise((r) => setTimeout(r, 500));

          fetch("http://localhost:5000/sign", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: url,
              fullName: values.fullName,
              location: values.location,
              publication: values.publication,
            }),
          });

          await new Promise((r) => setTimeout(r, 35000));
          stopLoading();
          handleOpen();
        }}
      >
        <Form>
          <Field
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            className="fullName"
            style={{
              width: 500,
              height: 30,
              borderColor: "#2872fb",
              borderRadius: "15px",
              marginTop: "5%",
              marginBottom: "5%",
              fontFamily: "Sintony",
              fontSize: "1em",
            }}
          />
          <br></br>
          <Field
            id="location"
            name="location"
            placeholder="Location"
            style={{
              width: 500,
              height: 30,
              borderColor: "#2872fb",
              borderRadius: "15px",
              marginTop: "2%",
              marginBottom: "2%",
              fontFamily: "Sintony",
              fontSize: "1em",
            }}
          />
          <br></br>
          <Field
            id="publication"
            name="publication"
            placeholder="Publication"
            type="publication"
            style={{
              width: 500,
              height: 30,
              borderColor: "#2872fb",
              borderRadius: "15px",
              marginTop: "5%",
              marginBottom: "5%",
              fontFamily: "Sintony",
              fontSize: "1em",
              borderShadow: "none",
            }}
          />
          <br></br>
          <button type="submit" className="btn">
            {loading ? <div className="loader"></div> : <div>SIGN</div>}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

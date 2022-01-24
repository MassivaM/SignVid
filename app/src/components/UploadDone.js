import "../scss/Title.scss";
import video1 from "../assets/test.mp4";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, Field, Form } from "formik";
import "../scss/UploadDone.scss";
export default function UploadDone({ video }) {
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

  return (
    <div style={{ alignContent: "center", justifyContent: "center" }}>
      <video width="500" height="300" style={{ paddingLeft: "0%" }} controls>
        <source src={video} type="video/mp4" />
        Your browser does not support HTML video.
      </video>
      <Formik
        initialValues={{
          fullName: "",
          location: "",
          publication: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
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
              borderRadius: "5px",
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
              borderRadius: "5px",
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
              borderRadius: "5px",
              marginTop: "5%",
              marginBottom: "5%",
              fontFamily: "Sintony",
              fontSize: "1em",
            }}
          />
          <br></br>
          <button type="submit" className="btn">
            SIGN
          </button>
        </Form>
      </Formik>
    </div>
  );
}

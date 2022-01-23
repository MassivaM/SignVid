//Source : https://react-dropzone.js.org/#section-styling-dropzone

import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import "../scss/Dropzone.scss";
const getColor = (props) => {
  if (props.isDragAccept) {
    return "#F9DB35";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#2872FB";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6em;
  border-width: 2px;
  border-radius: 1px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #cddfff;
  color: 89b2ff;

  transition: border 0.24s ease-in-out;
`;

export default function Dropzone(props) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: "image/*" });

  return (
    <div className="container">
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p className="drag">
          Drag and drop your video here, or click to select
        </p>
      </Container>
    </div>
  );
}

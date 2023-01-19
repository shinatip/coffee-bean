import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function UploadData() {
  const [csvfile, setCsvfile] = useState([]);
  const whenUpload = (e) => {
    console.log("upload", e.target.files);
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      setCsvfile(e.target.result);
    };
    console.log(csvfile);
  };

  const uploadFileAction = () => {};

  return (
    <div>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>import data from CSV file</Form.Label>
        <Form.Control type="file" name="csvfile" onChange={whenUpload} />
      </Form.Group>
      <Button
        variant="primary"
        // onClick={this.handleOnSearch}
      >
        Upload
      </Button>
    </div>
  );
}

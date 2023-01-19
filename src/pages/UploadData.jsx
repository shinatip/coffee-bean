import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import SyncLoader from "react-spinners/ClipLoader";

export default function UploadData() {
  const [csvfile, setCsvfile] = useState("");
  const [insert, setInsert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const whenUpload = (e) => {
    if (insert) {
      setInsert(false);
      setMsg("");
    }
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setCsvfile(e.target.result);
    };
  };

  const uploadFileAction = () => {
    setLoading(true);
    let arr = [];
    const linesArray = csvfile.split("\n");
    linesArray.forEach((e) => {
      const row = e.split("\r")[0];
      arr.push(row);
    });

    let objList = [];
    arr.slice(1).forEach((a) => {
      const val = a.split(",");
      if (val.length === 5) {
        const obj = {
          party_Type: val[0],
          name: val[1],
          country: val[2],
          buy_price: val[3] || 0,
          sell_price: val[4] || 0,
        };
        objList.push(obj);
      }
    });

    objList.forEach((data) => {
      let url = `http://localhost:5001/findname?name=${data.name}`;
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((e) => {
            if (e.length < 1) {
              fetch(`http://localhost:5001/create`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }).then((res) => {
                if (res.ok) {
                  setInsert(true);
                  setMsg("Insert new data successfully!!");
                } else {
                  console.log(res.status);
                }
                setLoading(false);
              });
            } else {
              fetch(`http://localhost:5001/update`, {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }).then((res) => {
                if (res.ok) {
                  setInsert(true);
                  setMsg("Updated data successfully!!");
                } else {
                  console.log(res.status);
                }
                setLoading(false);
              });
            }
          });
        }
      });
    });
  };
  return (
    <div>
      {loading ? (
        <div className="spinner">
          <SyncLoader
            className="spinner"
            loading={true}
            size={150}
            color="#36d7b7"
          />
        </div>
      ) : (
        <>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>import data from CSV file</Form.Label>
            <Form.Control
              type="file"
              name="csvfile"
              accept=".csv"
              onChange={whenUpload}
            />
          </Form.Group>
          <Button variant="primary" onClick={uploadFileAction}>
            Upload
          </Button>
          {insert ? (
            <div style={{ marginTop: "10px" }}>
              <Alert key="success" variant="success">
                {msg}
              </Alert>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

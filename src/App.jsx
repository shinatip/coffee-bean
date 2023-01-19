import { useEffect, useState } from "react";
import "./App.css";
import InfoTable from "./pages/InfoTable";
import UploadData from "./pages/UploadData";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/" style={{ padding: "20px" }}>
              Inquiry Parties
            </Nav.Link>
            <Nav.Link href="/upload" style={{ padding: "20px" }}>
              Upload Document
            </Nav.Link>
            <Nav.Link href="#pricing" style={{ padding: "20px" }}>
              Calculator
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<InfoTable />}></Route>
          <Route path="/upload" element={<UploadData />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

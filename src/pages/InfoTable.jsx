import React, { Component } from "react";
import DataTable from "react-data-table-component";
import SyncLoader from "react-spinners/ClipLoader";
import { Form, Row, Col, Button } from "react-bootstrap";

export default class InfoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      loading: true,
      name: "",
      country: "",
    };
  }

  componentDidMount() {
    let delay = 2;
    let countDown = setInterval(() => {
      delay--;
      if (delay === 0) {
        clearInterval(countDown);
        this.setState({
          loading: false,
        });
      }
    }, 500);
  }

  setColumns = (data) => {
    const cols = [
      { name: "name", selector: (row) => row.name, sortable: true },
      { name: "party type", selector: (row) => row.partyType, sortable: true },
      { name: "country", selector: (row) => row.country, sortable: true },
      { name: "Buy price", selector: (row) => row.buy, sortable: true },
      { name: "Sell price", selector: (row) => row.sell, sortable: true },
    ];

    let arr = [];

    data.forEach((el) => {
      arr.push({
        id: el.id,
        name: el.name,
        partyType: el.party_Type,
        country: el.country,
        buy: el.buy_price,
        sell: el.sell_price,
      });
    });
    this.setState({ columns: cols, data: arr, loading: false });
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };

  handleOnSearch = () => {
    fetch(
      `http://localhost:5001/data?name=${this.state.name}&country=${this.state.country}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((json) => {
          this.setColumns(json);
        });
      } else {
        console.log(res.status);
      }
    });
  };

  render() {
    return (
      <div>
        <div
          className="spinner"
          style={{ display: !this.state.loading ? "none" : "block" }}
        >
          <SyncLoader loading={this.state.loading} size={150} color="#36d7b7" />
        </div>
        <div style={{ display: !this.state.loading ? "block" : "none" }}>
          <Form>
            <Row>
              <Col md={5}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Search By Name"
                    name="name"
                    value={this.state.name}
                    onChange={(e) => this.handleOnChange(e)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    placeholder="Search By Country"
                    name="country"
                    value={this.state.country}
                    onChange={(e) => this.handleOnChange(e)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Button
                  style={{ marginTop: "30px" }}
                  variant="primary"
                  onClick={this.handleOnSearch}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          <br />
          <DataTable columns={this.state.columns} data={this.state.data} />
        </div>
      </div>
    );
  }
}

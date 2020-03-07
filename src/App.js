import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import "./App.css";
class App extends Component {
  state = {
    data: [],
    search: ""
  };
  originalData = [];
  componentDidMount() {
    axios
      .get("http://localhost:4300/customer")
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .then(() => {
        this.originalData = this.state.data;
      });
  }
  filterData = () => {
    const { search } = this.state;
    if (!search) this.setState({ data: this.originalData });
    else {
      const lowercasedValue = search
        .toString()
        .toLowerCase()
        .trim();
      const filter = this.originalData.filter(item => {
        return Object.keys(item).some(key =>
          item[key]
            .toString()
            .toLowerCase()
            .includes(lowercasedValue)
        );
      });
      console.log(filter);
      this.setState({ data: filter });
    }
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const columns = [
      {
        Header: "Id",
        accessor: "id"
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Phone",
        accessor: "phone"
      }
    ];

    const { search, data } = this.state;
    return (
      <>
        <div className="container">
          <h1>React-Table</h1>

          <input
            className="form-control searchFilter"
            placeholder="Search..."
            value={search}
            name="search"
            onChange={e => this.handleChange(e)}
            onKeyUp={this.filterData}
          />
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={10}
            pageSizeOptions={[10, 15, 20]}
            className="-highlight"
            SubComponent={row => {
              return (
                <div className="subcomp">
                  Name: {row.row.name}
                  <br />
                  Address: {data[row.row.id - 1].address}
                </div>
              );
            }}
          />
        </div>
      </>
    );
  }
}
export default App;

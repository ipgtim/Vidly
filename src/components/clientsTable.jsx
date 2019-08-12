import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";

class ClientsTable extends Component {
  columns = [
    {
      path: "id",
      label: "ID"
    },
    {
      path: "client_name",
      label: "Client Name",
      content: client => (
        <Link to={`/clients/${client.id}`}>{client.client_name}</Link>
      )
    },
    { path: "client_code", label: "Client Code" },
    { path: "agency", label: "Agency" }
  ];

  deleteColumn = {
    key: "delete",
    content: client => (
      <button
        onClick={() => this.props.onDelete(client)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { clients, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={clients}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ClientsTable;

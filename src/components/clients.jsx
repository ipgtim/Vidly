import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import ClientsTable from "./clientsTable";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";
import { getClients, deleteClient } from "../services/clientService";
import { getAgencies } from "../services/agencyService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";
import _ from "lodash";

class Clients extends Component {
  state = {
    clients: [],
    agencies: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedAgency: null,
    sortColumn: { path: "client_name", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getAgencies();
    const agencies = [{ id: "0", agency_name: "All Agencies" }, ...data];
    console.log("okkk", agencies);

    const { data: clients } = await getClients();
    this.setState({ clients, agencies });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // binding this event handler in the constructor so we can get access to the current object
  handleDelete = async client => {
    const originalClients = this.state.clients;
    const clients = originalClients.filter(c => c.id !== c.id);
    this.setState({ clients });

    try {
      await deleteClient(client.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This client has already been deleted.");

      this.setState(originalClients);
    }
  };

  handleAgencySelect = agency => {
    this.setState({ selectedAgency: agency, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedAgency: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedAgency,
      clients: allClients,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered = allClients;

    if (searchQuery) {
      filtered = allClients.filter(m =>
        m["client_name"].toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedAgency && selectedAgency.id) {
      filtered = allClients.filter(
        c => c.agency === selectedAgency.agency_name
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const clients = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: clients };
  };

  render() {
    const { length: clientsCount } = this.state.clients;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (clientsCount === 0) return <p>There are no clients in the database.</p>;

    const { totalCount, data: paginatedClients } = this.getPagedData();
    console.log("oh yeah", paginatedClients);

    return (
      <div className="row">
        <div className="col-4">
          <ListGroup
            items={this.state.agencies}
            selectedItem={this.state.selectedAgency}
            onItemSelect={this.handleAgencySelect}
          />
        </div>
        <div className="col">
          {
            <Link
              to="/client/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              Add Client
            </Link>
          }
          <CSVLink data={this.state.clients}>Export as CSV</CSVLink>
          <p>Showing {totalCount} clients in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <ClientsTable
            clients={paginatedClients}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Clients;

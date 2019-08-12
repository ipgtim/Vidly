import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getClient, saveClient } from "../services/clientService";
import { getAgencies } from "../services/agencyService";

class ClientForm extends Form {
  state = {
    data: {
      id: "",
      client_name: "",
      client_code: "",
      agency_name: "",
      agency_code: "",
      is_active: ""
    },
    agencies: [],
    errors: {}
  };

  schema = {
    id: Joi.number()
      .required()
      .min(0)
      .label("id"),
    client_name: Joi.string()
      .required()
      .min(0)
      .max(100)
      .label("Client Name"),
    client_code: Joi.string()
      .required()
      .min(0)
      .max(100)
      .label("Client Code"),
    agency_name: Joi.string()
      .required()
      .min(0)
      .max(100)
      .label("Agency Name"),
    agency_code: Joi.string()
      .required()
      .min(0)
      .max(100)
      .label("Agency Code"),
    is_active: Joi.string()
      .required()
      .min(0)
      .max(100)
      .label("Is Active")
  };

  async populateAgencies() {
    const { data: agencies } = await getAgencies(); // get data property and rename it to agencies
    this.setState({ agencies });
  }

  async populateClient() {
    try {
      console.log("sweet", this.props.match.params);
      const clientId = this.props.match.params.id;
      if (clientId === "new") return;

      const { data: client } = await getClient(clientId);
      this.setState({ data: this.mapToViewModel(client) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateAgencies();
    await this.populateClient();
  }

  mapToViewModel(client) {
    return {
      id: client.id,
      client_name: client.client_name,
      client_code: client.client_code,
      agency_name: client.agency_name,
      agency_code: client.agency_code,
      is_active: client.is_active
    };
  }

  doSubmit = async () => {
    await saveClient(this.state.data);

    this.props.history.push("/clients");
  };

  render() {
    console.log("ye", this.state.agencies);
    return (
      <div>
        <h1>New Client Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("client_name", "Client Name")}
          {this.renderSelect("agency_name", "Agency Name", this.state.agencies)}
          {this.renderButton("Add Client")}
        </form>
      </div>
    );
  }
}

export default ClientForm;

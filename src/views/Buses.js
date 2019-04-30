import React from 'react';
import { ActionList, AppProvider, Autocomplete, Button, Card, Checkbox, ContextualSaveBar, DataTable, DatePicker, DisplayText, Form, FormLayout, Frame, Label, Layout, List, Loading, Modal, Navigation, Page, RadioButton, Select, TextContainer, TextField, Toast, TopBar, SkeletonPage, SkeletonBodyText, SkeletonDisplayText } from '@shopify/polaris';

class Buses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      showBusesModal: false,
      busNameFieldValue: "",
      busCapacityFieldValue: "",
      driverNameFieldValue: "",
      driverPhoneNumberFieldValue: "",
      busRouteFieldValue: ""
    };
    this.fetchData();
  }

  fetchData() {
    fetch("http://192.168.0.108:3000/bus/").then(response => response.json()).then(data => {
      var tableData = data;
      var rows = [];
      for (var i = 0; i < tableData.length; i++) {
        rows.push([tableData[i].Bi_busName, tableData[i].Bi_busRoute, tableData[i].Bi_busCapacity, tableData[i].Bi_busDriverName, tableData[i].Bi_driverPhone]);
      }
      this.setState({ rows: rows });
    });
  }

  render() {
    var modalMarkup;
    modalMarkup = (
      <Modal
        open={this.state.showBusesModal}
        onClose={this.handleShowStudentsModalClose}
        title="Heading"
        primaryAction={{
          content: 'Submit',
          onAction: this.showSubmitMessage,
        }}
      >
        <Modal.Section>
          <FormLayout>
            <FormLayout.Group>
              <TextField
                label="Bus Name"
                value={this.state.busNameFieldValue}
                onChange={this.handleBusNameFieldChange}
                type="text"
              />
              <TextField
                label="Bus Capacity"
                value={this.state.busCapacityFieldValue}
                onChange={this.handleBusCapacityFieldChange}
                type="text"
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                label="Driver name"
                value={this.state.driverNameFieldValue}
                onChange={this.handleDriverNameFieldChange}
                type="text"
              />
              <TextField
                label="Driver phone number"
                value={this.state.driverPhoneNumberFieldValue}
                onChange={this.handleDriverPhoneNumberFieldChange}
                type="text"
              />
            </FormLayout.Group>
            <TextField
              label="Bus Route"
              value={this.state.busRouteFieldValue}
              onChange={this.handleBusRouteFieldChange}
              type="text"
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );
    var abc = (
      <Page>
        {modalMarkup}
        <div style={{ marginLeft: "89%", marginBottom: "1%" }}><Button primary onClick={this.showBusesModal}>Add Bus</Button></div>
        <Card>
          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'text',
              'text',
              'text',
            ]}
            headings={[
              'Bus Name',
              'Route',
              'Capacity',
              'Driver',
              'Phone',
            ]}
            rows={this.state.rows}
            footerContent={`Showing ${this.state.rows.length} of ${this.state.rows.length} results`}
          />
        </Card>
      </Page>
    );

    return abc;
  }
  showBusesModal = () => {
    this.setState({ showBusesModal: true });
  }

  handleBusNameFieldChange = (busNameFieldValue) => {
    this.setState({ busNameFieldValue });
  };

  handleBusCapacityFieldChange = (busCapacityFieldValue) => {
    this.setState({ busCapacityFieldValue });
  };

  handleDriverNameFieldChange = (driverNameFieldValue) => {
    this.setState({ driverNameFieldValue });
  };

  handleDriverPhoneNumberFieldChange = (driverPhoneNumberFieldValue) => {
    this.setState({ driverPhoneNumberFieldValue });
  };

  handleBusRouteFieldChange = (busRouteFieldValue) => {
    this.setState({ busRouteFieldValue });
  };

  handleShowStudentsModalClose = () => {
    this.resetFields();
  };

  resetFields = () => {
    this.setState({
      showBusesModal: false,
      busNameFieldValue: "",
      busCapacityFieldValue: "",
      driverNameFieldValue: "",
      driverPhoneNumberFieldValue: "",
      busRouteFieldValue: ""
    });
  }
  showSubmitMessage = () => {
    var data = {
      bName: this.state.busNameFieldValue,
      bRoute: this.state.busRouteFieldValue,
      bCapacity: this.state.busCapacityFieldValue,
      bDriver: this.state.driverNameFieldValue,
      dPhone: this.state.driverPhoneNumberFieldValue
    };
    this.resetFields();
    fetch("http://192.168.0.108:3000/bus/", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response));
        this.fetchData();
        this.setState({ showBusesModal: false });
      })
      .catch(error => console.error('Error:', error));
  }
}

export default Buses;
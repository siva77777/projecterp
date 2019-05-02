import React from 'react';
import { ActionList, AppProvider, Autocomplete, Button, Card, Checkbox, ContextualSaveBar, DataTable, DatePicker, DisplayText, Form, FormLayout, Frame, Label, Layout, List, Loading, Modal, Navigation, Page, RadioButton, Select, TextContainer, TextField, Toast, TopBar, SkeletonPage, SkeletonBodyText, SkeletonDisplayText } from '@shopify/polaris';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
import {
    BrowserRouter,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';

class Standards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      showStandardsModal: false,
      standardFieldValue: "",
      classTeacherFieldValue: "",
      capacityFieldValue: "",
    };
    this.fetchData();
    this.renderButtons = this.renderButtons.bind(this);
  }

  fetchData() {
    fetch("http://192.168.0.108:3000/class/").then(response => response.json()).then(data => {
        console.log(data, "222222");
    var tableData = data;
      var rows = [];
      for (var i = 0; i < tableData.length; i++) {
        rows.push({standard: tableData[i].Ci_classStandard, classTeacher: tableData[i].Ci_teacherAutoID, capacity: tableData[i].Ci_classCapacity});
      }
      this.setState({ rows: rows });
    });
  }

  render() {
    var modalMarkup;
    modalMarkup = (
      <Modal
        open={this.state.showStandardsModal}
        onClose={this.handleshowStandardsModalClose}
        title="Heading"
        primaryAction={{
          content: 'Submit',
          onAction: this.showSubmitMessage,
        }}
      >
        <Modal.Section>
          <FormLayout>
              <TextField
                label="Standard"
                value={this.state.standardFieldValue}
                onChange={this.handleStandardFieldChange}
                type="text"
              />
              <TextField
                label="Class Teacher"
                value={this.state.classTeacherFieldValue}
                onChange={this.handleClassTeacherFieldChange}
                type="text"
              />
              <TextField
                label="Capacity"
                value={this.state.capacityFieldValue}
                onChange={this.handleCapacityFieldChange}
                type="text"
              />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );
    const { SearchBar } = Search;

    const columns = [{
      dataField: 'standard',
      text: 'Standard',
      formatter: this.renderButtons,
      sort: true
    }, {
      dataField: 'classTeacher',
      text: 'Class Teacher',
      sort: true
    }, {
      dataField: 'capacity',
      text: 'Capacity',
      sort: true
    }
  ];

    var abc = (
      <Page>
        {modalMarkup}
        <div style={{ marginLeft: "89%", marginBottom: "1%" }}><Button primary onClick={this.showStandardsModal}>Add Standard</Button></div>
        <ToolkitProvider
          keyField="id"
          data={this.state.rows}
          columns={columns}
          search
        >
          {
            props => {
              return (
              <div>
                <SearchBar {...props.searchProps} style={{height:"34px", padding: "6px 12px"}}placeholder="Search Units"/>
                <BootstrapTable
                  {...props.baseProps}
                  pagination={ paginationFactory() }
                  bootstrap4
                />
              </div>
            )
              }
          }
        </ToolkitProvider>
      </Page>
    );

    return abc;
  }
  showStandardsModal = () => {
    this.setState({ showStandardsModal: true });
  }

  handleStandardFieldChange = (standardFieldValue) => {
    this.setState({ standardFieldValue });
  };

  handleClassTeacherFieldChange = (classTeacherFieldValue) => {
    this.setState({ classTeacherFieldValue });
  };

  handleCapacityFieldChange = (capacityFieldValue) => {
    this.setState({ capacityFieldValue });
  };

  handleshowStandardsModalClose = () => {
    this.resetFields();
  };

  resetFields = () => {
    this.setState({
      showStandardsModal: false,
      standardFieldValue: "",
      classTeacherFieldValue: "",
      capacityFieldValue: "",
    });
  }
  showSubmitMessage = () => {
    var data = {
      standard: this.state.standardFieldValue,
      teacherID: this.state.classTeacherFieldValue,
    };
    this.resetFields();
    fetch("http://192.168.0.108:3000/class/", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response));
        this.fetchData();
        this.setState({ showStandardsModal: false });
      })
      .catch(error => console.error('Error:', error));
  }
  renderButtons(cell, row) {
      console.log(this, this.show, "dsadsad");
    return (
        <a style={{color: "blue"}} onClick={this.show.bind(this,cell,row)}>
          {cell}
        </a>
    );
  }
  show = (cell,row) => {
      console.log(cell, row, "111");
  }
}

export default Standards;
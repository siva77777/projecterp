import React from 'react';
import { ActionList, AppProvider, Autocomplete, Button, Card, Checkbox, ContextualSaveBar, DatePicker, DisplayText, Form, FormLayout, Frame, Label, Layout, List, Loading, Modal, Navigation, Page, RadioButton, Select, TextContainer, TextField, Toast, TopBar, SkeletonPage, SkeletonBodyText, SkeletonDisplayText } from '@shopify/polaris';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css'

class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      classOptions: [],
      showStudentsModal: false,
      showFirstPage: true,
      showSecondPage: false,
      firstNameFieldValue: "",
      lastNameFieldValue: "",
      emailAddressFieldValue: "",
      phoneNumberFieldValue: "",
      dateFieldValue: "",
      yearFieldValue: "",
      addressFieldValue: "",
      fatherNameFieldValue: "",
      motherNameFieldValue: "",
      fatherOccupationFieldValue: "",
      motherOccupationFieldValue: "",
      parentPhoneNumberFieldValue: "",
      guardianNameFieldValue: "",
      guardianPhoneNumberFieldValue: "",
      value: "disabled"
    };
    this.fetchData();
  }

  fetchData() {
    fetch("http://192.168.0.108:3000/admission/students").then(response => response.json()).then(data => {
    var tableData = data;
      var rows = [];
      for (var i = 0; i < tableData.length; i++) {
        rows.push({studentID: tableData[i].Si_studentID, name: tableData[i].Si_firstName + " " + tableData[i].Si_lastName, class: tableData[i].Ci_classStandard, parent: tableData[i].Pi_fatherFirstName + " " + tableData[i].Pi_fatherLastName, phone: tableData[i].Pi_parentPhone, residentDetails: tableData[i].Si_residentDetails});
      }
      this.setState({ rows: rows });
    });
    fetch("http://192.168.0.108:3000/class/").then(response => response.json()).then(data => {
      console.log(data, "444444");
      var options=[];
      for (var i = 0; i < data.length; i++) {
        options.push({label: data[i].Ci_classStandard, value: data[i].Ci_classStandard});
      }
      this.setState({classOptions: options});
    })
  }

  render() {
    const monthOptions = [
      { label: 'January', value: "01" },
      { label: 'February', value: "02" },
      { label: 'March', value: "03" },
      { label: 'April', value: "04" },
      { label: 'May', value: "05" },
      { label: 'June', value: "06" },
      { label: 'July', value: "07" },
      { label: 'August', value: "08" },
      { label: 'September', value: "09" },
      { label: 'October', value: "10" },
      { label: 'November', value: "11" },
      { label: 'December', value: "12" },
    ];
    const genderOptions = [
      { label: 'Male', value: "male" },
      { label: 'Female', value: "female" }
    ];

    const categoryOptions = [
      { label: 'General', value: "general" },
      { label: 'OBC', value: "obc" },
      { label: 'SC', value: "sc" },
      { label: 'ST', value: "st" },
    ];
    var modalMarkup;
    if (this.state.showFirstPage) {
      modalMarkup = (
        <Modal
          open={this.state.showStudentsModal}
          onClose={this.handleShowStudentsModalClose}
          title="Heading"
          primaryAction={{
            content: 'Continue',
            onAction: this.handleShowStudentsModalSecondPage,
          }}
          secondaryActions={[{
            content: 'Back',
            onAction: this.handleShowStudentsModalClose,
          }]}
        >
          <Modal.Section>
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  label="First name"
                  value={this.state.firstNameFieldValue}
                  onChange={this.handleFirstNameFieldChange}
                  type="text"
                />
                <TextField
                  label="Last name"
                  value={this.state.lastNameFieldValue}
                  onChange={this.handleLastNameFieldChange}
                  type="text"
                />
              </FormLayout.Group>
              <Select
                  label="Class"
                  options={this.state.classOptions}
                  onChange={this.handleClassChange}
                  value={this.state.selectedClass}
              />
              <TextField
                label="Email address"
                value={this.state.emailAddressFieldValue}
                onChange={this.handleEmailAddressFieldChange}
                type="email"
                placeholder="name@email.com"
              />
              <TextField
                label="Phone number"
                value={this.state.phoneNumberFieldValue}
                onChange={this.handlePhoneNumberFieldChange}
                type="tel"
              />
              <FormLayout.Group condensed>
                <Select
                  label="Month"
                  options={monthOptions}
                  onChange={this.handleMonthChange}
                  value={this.state.selectedMonth}
                />
                <TextField
                  label="Date"
                  value={this.state.dateFieldValue}
                  onChange={this.handleDateFieldChange}
                  type="text"
                />
                <TextField
                  label="Year"
                  value={this.state.yearFieldValue}
                  onChange={this.handleYearFieldChange}
                  type="text"
                />
              </FormLayout.Group>
              <FormLayout.Group condensed>
                <Select
                  label="Gender"
                  options={genderOptions}
                  onChange={this.handleGenderChange}
                  value={this.state.selectedGender}
                />
                <Select
                  label="Category"
                  options={categoryOptions}
                  onChange={this.handleCategoryChange}
                  value={this.state.selectedCategory}
                />
              </FormLayout.Group>
              <TextField
                label="Address"
                value={this.state.addressFieldValue}
                onChange={this.handleAddressFieldChange}
                type="text"
                multiline
              />
              <RadioButton
                label="Day scholar"
                checked={this.state.value === 'disabled'}
                name="studentStay"
                id="disabled"
                onChange={this.handleStudentStayChange}
              />
              <RadioButton
                label="Hosteller"
                checked={this.state.value === 'optional'}
                name="studentStay"
                id="optional"
                onChange={this.handleStudentStayChange}
              />
            </FormLayout>
          </Modal.Section>
        </Modal>
      );
    } else if (this.state.showSecondPage) {
      modalMarkup = (
        <Modal
          open={this.state.showStudentsModal}
          onClose={this.handleShowStudentsModalClose}
          title="Heading"
          primaryAction={{
            content: 'Submit',
            onAction: this.showSubmitMessage,
          }}
          secondaryActions={[{
            content: 'Back',
            onAction: this.handleShowStudentsModalFirstPage,
          }]}
        >
          <Modal.Section>
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  label="Father name"
                  value={this.state.fatherNameFieldValue}
                  onChange={this.handleFatherNameFieldChange}
                  type="text"
                />
                <TextField
                  label="Father occupation"
                  value={this.state.fatherOccupationFieldValue}
                  onChange={this.handleFatherOccupationFieldChange}
                  type="text"
                />
                <TextField
                  label="Mother name"
                  value={this.state.motherNameFieldValue}
                  onChange={this.handleMotherNameFieldChange}
                  type="text"
                />
                <TextField
                  label="Mother occupation"
                  value={this.state.motherOccupationFieldValue}
                  onChange={this.handleMotherOccupationFieldChange}
                  type="text"
                />
                <TextField
                  label="Guardian name"
                  value={this.state.guardianNameFieldValue}
                  onChange={this.handleGuardianNameFieldChange}
                  type="text"
                />
                <TextField
                  label="Guardian phone number"
                  value={this.state.guardianPhoneNumberFieldValue}
                  onChange={this.handleGuardianPhoneNumberFieldChange}
                  type="text"
                />
                <TextField
                  label="Parent phone number"
                  value={this.state.parentPhoneNumberFieldValue}
                  onChange={this.handleParentPhoneNumberFieldChange}
                  type="text"
                />
              </FormLayout.Group>
            </FormLayout>
          </Modal.Section>
        </Modal>
      );
    }

    const { SearchBar } = Search;

    const columns = [{
      dataField: 'studentID',
      text: 'Student ID',
      sort: true
    }, {
      dataField: 'name',
      text: 'Name',
      sort: true
    }, {
      dataField: 'class',
      text: 'Class',
      sort: true
    }, {
      dataField: 'parent',
      text: 'Parent',
      sort: true
    }, {
      dataField: 'phone',
      text: 'Phone',
      sort: true
    }, {
      dataField: 'residentDetails',
      text: 'Resident Details',
      sort: true
    }
  ];

  var abc = (
    <Page>
      {modalMarkup}
      <div style={{ marginLeft: "89%", marginBottom: "1%" }}><Button primary onClick={this.showStudentsModal}>Add Student</Button></div>
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

  handleFirstNameFieldChange = (firstNameFieldValue) => {
    this.setState({ firstNameFieldValue });
  };

  handleLastNameFieldChange = (lastNameFieldValue) => {
    this.setState({ lastNameFieldValue });
  };


  handleEmailAddressFieldChange = (emailAddressFieldValue) => {
    this.setState({ emailAddressFieldValue });
  };

  handlePhoneNumberFieldChange = (phoneNumberFieldValue) => {
    this.setState({ phoneNumberFieldValue });
  };

  handleDateFieldChange = (dateFieldValue) => {
    this.setState({ dateFieldValue });
  };

  handleYearFieldChange = (yearFieldValue) => {
    this.setState({ yearFieldValue });
  };

  handleAddressFieldChange = (addressFieldValue) => {
    this.setState({ addressFieldValue });
  }

  handleFatherNameFieldChange = (fatherNameFieldValue) => {
    this.setState({ fatherNameFieldValue });
  }

  handleMotherNameFieldChange = (motherNameFieldValue) => {
    this.setState({ motherNameFieldValue });
  }

  handleFatherOccupationFieldChange = (fatherOccupationFieldValue) => {
    this.setState({ fatherOccupationFieldValue });
  }

  handleMotherOccupationFieldChange = (motherOccupationFieldValue) => {
    this.setState({ motherOccupationFieldValue });
  }

  handleFatherPhoneNumberFieldChange = (parentPhoneNumberFieldValue) => {
    this.setState({ parentPhoneNumberFieldValue });
  }

  handleGuardianNameFieldChange = (guardianNameFieldValue) => {
    this.setState({ guardianNameFieldValue });
  }

  handleGuardianPhoneNumberFieldChange = (guardianPhoneNumberFieldValue) => {
    this.setState({ guardianPhoneNumberFieldValue });
  }

  handleShowStudentsModalClose = () => {
    this.setState({ showStudentsModal: false });
  };

  handleShowStudentsModalFirstPage = () => {
    this.setState({ showFirstPage: true, showSecondPage: false });
  }

  handleShowStudentsModalSecondPage = () => {
    this.setState({ showFirstPage: false, showSecondPage: true });
  }

  handleClassChange = (newValue) => {
    this.setState({ selectedClass: newValue });
  };

  handleMonthChange = (newValue) => {
    this.setState({ selectedMonth: newValue });
  };

  handleGenderChange = (newValue) => {
    this.setState({ selectedGender: newValue });
  }

  handleCategoryChange = (newValue) => {
    this.setState({ selectedCategory: newValue });
  }

  handleStudentStayChange = (checked, newValue) => {
    this.setState({ value: newValue });
  };

  resetFields = () => {
    this.setState({
      showStudentsModal: false,
      firstNameFieldValue: "",
      lastNameFieldValue: "",
      emailAddressFieldValue: "",
      phoneNumberFieldValue: "",
      dateFieldValue: "",
      yearFieldValue: "",
      addressFieldValue: "",
      fatherNameFieldValue: "",
      motherNameFieldValue: "",
      fatherOccupationFieldValue: "",
      motherOccupationFieldValue: "",
      parentPhoneNumberFieldValue: "",
      guardianNameFieldValue: "",
      guardianPhoneNumberFieldValue: "",
      showFirstPage: true,
      showSecondPage: false,
      value: "disabled"
    });      
  }

  showStudentsModal = () => {
    this.setState({ showStudentsModal: true });
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
    fetch("http://192.168.0.108:3000/admission/students", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response));
        this.fetchData();
        this.setState({ showStudentsModal: false });
      })
      .catch(error => console.error('Error:', error));
  }
}

export default Students;
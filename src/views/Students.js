import React from 'react';
import { ActionList, AppProvider, Autocomplete, Card, Checkbox, ContextualSaveBar, DatePicker, DisplayText, Form, FormLayout, Frame, Label, Layout, List, Loading, Modal, Navigation, Page, RadioButton, Select, TextContainer, TextField, Toast, TopBar, SkeletonPage, SkeletonBodyText, SkeletonDisplayText } from '@shopify/polaris';

class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      fatherPhoneNumberFieldValue: "",
      guardianNameFieldValue: "",
      guardianPhoneNumberFieldValue: "",
      showStudentsModal: true,
      showFirstPage: true,
      showSecondPage: false,
      value: "disabled"
    };
  }

  componentWillUnmount() {
    this.setState({ showStudentsModal: true })
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
            content: 'Continue',
            onAction: this.handleShowStudentsModalClose,
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
                  label="Father phone number"
                  value={this.state.fatherPhoneNumberFieldValue}
                  onChange={this.handleFatherPhoneNumberFieldChange}
                  type="text"
                />
              </FormLayout.Group>
            </FormLayout>
          </Modal.Section>
        </Modal>
      );
    }
    return modalMarkup;
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

  handleFatherPhoneNumberFieldChange = (fatherPhoneNumberFieldValue) => {
    this.setState({ fatherPhoneNumberFieldValue });
  }

  handleGuardianNameFieldChange = (guardianNameFieldValue) => {
    this.setState({ guardianNameFieldValue });
  }

  handleGuardianPhoneNumberFieldChange = (guardianPhoneNumberFieldValue) => {
    this.setState({ guardianPhoneNumberFieldValue });
  }

  handleShowStudentsModalClose = () => {
    this.setState({ showStudentsModal: false }, () => { this.state.showStudentsModal = true; this.state.showFirstPage = true; this.state.showSecondPage = false });
  };

  handleShowStudentsModalFirstPage = () => {
    this.setState({ showFirstPage: true, showSecondPage: false });
  }

  handleShowStudentsModalSecondPage = () => {
    this.setState({ showFirstPage: false, showSecondPage: true });
  }

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
}

export default Students;
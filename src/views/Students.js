import React from 'react';
import {ActionList, AppProvider, Card, Checkbox, ContextualSaveBar, DisplayText, Form, FormLayout, Frame, Label, Layout, List, Loading, Modal, Navigation, Page, TextContainer, TextField, Toast, TopBar, SkeletonPage, SkeletonBodyText, SkeletonDisplayText} from '@shopify/polaris';

class Students extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        firstNameFieldValue:"",
        lastNameFieldValue:"",
        emailAddressFieldValue:"",
        phoneNumberFieldValue:"",
        customerMarketingCheckboxChecked: true,
        taxExemptCheckboxChecked: true,
        showStudentsModal: true
      };
    }

    componentWillUnmount() {
        this.setState({showStudentsModal: true})
    }
    
    render() {
        const showStudentsView = this.props.showStudentsView;
        const modalMarkup = (
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
                  <Checkbox
                    checked={this.state.customerMarketingCheckboxChecked}
                    label="Customer accepts marketing"
                    onChange={this.handleCustomerMarketingCheckboxChange}
                  />
                  <Checkbox
                    checked={this.state.taxExemptCheckboxChecked}
                    label="Customer is tax exempt"
                    onChange={this.handleTaxExemptCheckboxChange}
                  />
                </FormLayout>
              </Modal.Section>
            </Modal>
          );
          if (showStudentsView) {
              return modalMarkup;
          } else {
              return null;
          }
    }

    handleFirstNameFieldChange = (firstNameFieldValue) => {
        this.setState({firstNameFieldValue});
      };
      
      handleLastNameFieldChange = (lastNameFieldValue) => {
        this.setState({lastNameFieldValue});
      };
    
      
      handleEmailAddressFieldChange = (emailAddressFieldValue) => {
        this.setState({emailAddressFieldValue});
      };
    
      handlePhoneNumberFieldChange = (phoneNumberFieldValue) => {
        this.setState({phoneNumberFieldValue});
      };
    
      handleCustomerMarketingCheckboxChange = (customerMarketingCheckboxChecked) => {
        this.setState({customerMarketingCheckboxChecked});
      };
    
      handleTaxExemptCheckboxChange = (taxExemptCheckboxChecked) => {
        this.setState({taxExemptCheckboxChecked});
      };

      handleShowStudentsModalClose = () => {
        this.setState({showStudentsModal: false}, ()=>{this.state.showStudentsModal = true});
      };
}

export default Students;
import React from 'react';
import {ActionList, AppProvider, Card, ContextualSaveBar, DisplayText, Form, FormLayout, Frame, Label, Layout, List, Loading, Modal, Navigation, Page, TextContainer, TextField, Toast, TopBar, SkeletonPage, SkeletonBodyText, SkeletonDisplayText} from '@shopify/polaris';

export default class FrameExample extends React.Component {

  state = {
    isLoading: false,
    modalActive: false,
    showMobileNavigation: false,
  };

  render() {
    const {
      modalActive,
      showMobileNavigation,
    } = this.state;

    const userMenuMarkup = (
      <TopBar.UserMenu
        name="Helen B."
        detail="Administrator"
        initials="H"
      />
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle={true}
        userMenu={userMenuMarkup}
        onNavigationToggle={this.toggleState('showMobileNavigation')}
      />
    );

    const modalMarkup = (
      <Modal
        open={modalActive}
        onClose={this.toggleState('modalActive')}
        title="Contact support"
        primaryAction={{
          content: 'Send',
          onAction: this.toggleState('modalActive'),
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label="Subject"
              value={this.state.supportSubject}
              onChange={this.handleSubjectChange}
            />
            <TextField
              label="Message"
              value={this.state.supportMessage}
              onChange={this.handleMessageChange}
              multiline
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );

    const navigationMarkup = (
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              label: 'Home',
              icon: 'home',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'Students',
              icon: 'orders',
              onClick: this.toggleState('modalActive'),
            },
            {
              label: 'Teachers',
              icon: 'orders',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'Guardians',
              icon: 'orders',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'Subjects',
              icon: 'orders',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'Exams',
              icon: 'orders',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'ExtraCurricular',
              icon: 'orders',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'Fees Collection',
              icon: 'orders',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'Buses',
              icon: 'orders',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'Hostels',
              icon: 'orders',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'Staff',
              icon: 'orders',
              onClick: this.toggleState('isLoading'),
            },
          ]}
        />
      </Navigation>
    );

    const theme = {
      colors: {
        topBar: {
          background: '#357997',
        },
      }
    };

    return (
      <div style={{height: '500px'}}>
        <AppProvider theme={theme}>
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={showMobileNavigation}
            onNavigationDismiss={this.toggleState('showMobileNavigation')}
          >
          {modalMarkup}
          </Frame>
        </AppProvider>
      </div>
    );
  }

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };
}
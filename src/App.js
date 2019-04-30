import React from 'react';
import { ActionList, AppProvider, Card, Checkbox, ContextualSaveBar, DisplayText, Form, FormLayout, Frame, Label, Layout, List, Loading, Modal, Navigation, Page, TextContainer, TextField, Toast, TopBar, SkeletonPage, SkeletonBodyText, SkeletonDisplayText } from '@shopify/polaris';
import Students from './views/Students';
import Buses from './views/Buses';
export default class FrameExample extends React.Component {

  state = {
    isLoading: false,
    showStudentsView: false,
    showMobileNavigation: false,
    showBusesView: false
  };

  render() {
    const {
      showMobileNavigation,
      showStudentsView,
      showBusesView
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
        onNavigationToggle={showMobileNavigation}
      />
    );

    const navigationMarkup = (
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              label: 'Home',
              icon: 'home',
            },
            {
              label: 'Students',
              icon: 'orders',
              onClick: this.showStudentsView,
            },
            {
              label: 'Teachers',
              icon: 'orders',
            },
            {
              label: 'Guardians',
              icon: 'orders',
            },
            {
              label: 'Subjects',
              icon: 'orders',
            },
            {
              label: 'Exams',
              icon: 'orders',
            },
            {
              label: 'ExtraCurricular',
              icon: 'orders',
            },
            {
              label: 'Fees Collection',
              icon: 'orders',
            },
            {
              label: 'Buses',
              icon: 'orders',
              onClick: this.showBusesView,
            },
            {
              label: 'Hostels',
              icon: 'orders',
            },
            {
              label: 'Staff',
              icon: 'orders',
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
      <div style={{ height: '500px' }}>
        <AppProvider theme={theme}>
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={showMobileNavigation}
            onNavigationDismiss={this.hideMobileNavigation}
          >
            {showStudentsView ? <Students /> : null}
            {showBusesView ? <Buses /> : null}
          </Frame>
        </AppProvider>
      </div>
    );
  }
  showMobileNavigation = () => {
    this.setState({ showMobileNavigation: true });
  }
  hideMobileNavigation = () => {
    this.setState({ showMobileNavigation: false });
  }
  showStudentsView = () => {
    this.setState({ showStudentsView: true, showBusesView: false });
  }
  showBusesView = () => {
    this.setState({ showBusesView: true, showStudentsView: false });
  }
}
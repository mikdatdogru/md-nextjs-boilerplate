import React from 'react';
import { connect } from 'react-redux';
import { startClock, serverRenderClock } from '../actions/common';
import Examples from '../components/examples';
import Header from '../layouts/Header';
import MainLayout from '../layouts/MainLayout';






class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req;
    reduxStore.dispatch(serverRenderClock(isServer));

    return {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.timer = startClock(dispatch);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <MainLayout>
        <p>Hello Next.js</p>
        <Examples />
      </MainLayout>
    );
  }
}

export default connect()(Index);

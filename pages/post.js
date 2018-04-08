import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Layout from '../components/MyLayout';

import { initStore } from '../store';
import { getMovie } from '../actions/common';
import { withRedux } from '../utils';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { show } = this.props;
    return (
      <Layout>
        <h1>{show.name}</h1>
        <p>{show.summary.replace(/<[/]?p>/g, '')}</p>
        <img src={show.image.medium} alt={show.name} />
      </Layout>
    );
  }
}

Post.getInitialProps = async context => {
  const { id } = context.query;

  const movie = await context.store.dispatch(getMovie(id));

  return { show: movie.data };
};

Post.propTypes = {
  show: PropTypes.objectOf(PropTypes.any).isRequired,
};
Post.defaultProps = {};

const mapDispatchToProps = dispatch => {
  return {
    getMovie: bindActionCreators(getMovie, dispatch),
  };
};
export default withRedux(initStore, null, mapDispatchToProps)(Post);

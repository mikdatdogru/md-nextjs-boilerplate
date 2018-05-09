import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Layout from '../../components/Layout';

import { getMovie } from '../../actions/common';
import { withRedux, store } from '../../utils/index';
import pageWithIntl from '../../components/PageWithIntl';

class Index extends Component {
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

Index.getInitialProps = async context => {
  const { id } = context.query;

  const movie = await context.store.dispatch(getMovie(id));

  return { show: movie.data };
};

Index.propTypes = {
  show: PropTypes.objectOf(PropTypes.any).isRequired,
};
Index.defaultProps = {};

const mapDispatchToProps = dispatch => ({
  getMovie: bindActionCreators(getMovie, dispatch),
});
export default pageWithIntl(withRedux(store, null, mapDispatchToProps)(Index));

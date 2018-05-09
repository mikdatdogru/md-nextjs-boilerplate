import Head from 'next/head';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Bootstrap 4
import 'bootstrap/dist/css/bootstrap.min.css';

import store from '../utils/store';
import Header from './Header';
import { localStorageData } from '../utils/helper';
import { setLocale } from '../actions/common';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
};

if (typeof navigator !== 'undefined') {
  const language =
    (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

  const lang = localStorageData.get('language');

  if (lang) {
    store().dispatch(setLocale(lang.data));
  } else {
    store().dispatch(setLocale(languageWithoutRegionCode));
  }
}

const Layout = ({ intl, children, title, ...rest }) => (
  <div style={layoutStyle}>
    <Head>
      <title>{intl.messages['title'] || title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container>
      <div>
        <Header />
      </div>
      <div>{children}</div>
    </Container>

    <footer className="text-center">Footer</footer>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  intl: PropTypes.objectOf(PropTypes.any).isRequired,
};
Layout.defaultProps = {
  title: 'ThickLine (dp)',
};

export default injectIntl(Layout);

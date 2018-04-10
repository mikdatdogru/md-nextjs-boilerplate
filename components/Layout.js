import Head from 'next/head';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

// Bootstrap 4
import 'bootstrap/dist/css/bootstrap.min.css';


import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
};

const Layout = ({ children, title }) => (
  <div style={layoutStyle}>
    <Head>
      <title>{title}</title>
      <title>ThickLine</title>
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
};
Layout.defaultProps = {
  title: 'ThickLine',
};

export default Layout;

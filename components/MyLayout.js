import PropTypes from 'prop-types';
import Header from './Header';



const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
Layout.defaultProps = {};

export default Layout;

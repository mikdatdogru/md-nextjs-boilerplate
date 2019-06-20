import React from 'react';
import PropTypes from 'prop-types';
import LanguageChanger from '../components/LanguageChanger';

const Header = props => {
	return (
		<div>
			<h3>Header</h3>
			<div>
				<LanguageChanger />
			</div>
		</div>
	);
};

Header.propTypes = {};
Header.defaultProps = {};

export default Header;

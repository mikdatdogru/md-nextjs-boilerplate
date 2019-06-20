import 'isomorphic-fetch';
import React from 'react';
import { connect } from 'react-redux';
import withIntl from '../lib/withIntl';
import { setLang, getLang } from '../actions/locale';

class LanguageChanger extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.getLang();

	}

	setLocale = lang => {
		this.props.setLang(lang);
	};

	render() {
		return (
			<div>
				<div onClick={() => this.setLocale('en')}>EN</div>
				<div onClick={() => this.setLocale('es')}>ES</div>
			</div>
		);
	}
}
const mapStateToProps = state => ({});
const mapDispatchToProps = {
	setLang,
	getLang,
};
export default withIntl(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(LanguageChanger),
);

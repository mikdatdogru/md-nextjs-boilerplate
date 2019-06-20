import 'isomorphic-fetch';
import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';

import withIntl from '../lib/withIntl';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		return (
			<div>
				<Head>
					<title>Todo Appx</title>
				</Head>
				Home Page
			</div>
		);
	}
}

Index.getInitialProps = async () => {
	return {};
};

export default withIntl(connect()(Index));

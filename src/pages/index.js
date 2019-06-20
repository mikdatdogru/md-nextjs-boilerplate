import 'isomorphic-fetch';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Todo from '../components/Todo';
import withIntl from '../lib/withIntl';


// Port in to using useState hooks, if you need state
class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		return (
			<div>
				<div>
					<FormattedMessage id="greeting" defaultMessage="Hello, Worlds!" />
				</div>


				<div>Hello Next</div>
				<div>
					<Todo />
				</div>
			</div>
		);
	}
}

Index.getInitialProps = async ({ store }) => {
	// Adding a default/initialState can be done as follows:
	// store.dispatch({ type: 'ADD_TODO', text: 'It works!' });
	const res = await fetch('https://api.github.com/repos/ooade/NextSimpleStarter');
	const json = await res.json();
	return { stars: json.stargazers_count };
};

export default withIntl(connect()(Index));

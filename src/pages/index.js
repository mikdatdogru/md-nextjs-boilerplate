import 'isomorphic-fetch';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Fork from '../components/Fork';
import Todo from '../components/Todo';
import withIntl from '../lib/withIntl';

const Title = styled.h1`
	color: red;
`;

// Port in to using useState hooks, if you need state
class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	setLocale = lang => {
		this.props.setLocale(lang);
	};

	render() {
		return (
			<div>
				<div>
					<FormattedMessage id="greeting" defaultMessage="Hello, Worlds!" />

					<div>
						<div onClick={() => this.setLocale('en')}>EN</div>
						<div onClick={() => this.setLocale('es')}>ES</div>
					</div>
				</div>

				<Fork stars={this.props.stars} />

				<Title>My First Next.js Page</Title>
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

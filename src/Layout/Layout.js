import React from 'react';
import { injectIntl } from 'react-intl';
import Head from 'next/head';
import Header from './Header';

const Layout = ({ children }) => (
	<div>
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>

		<Header />

		{children}
	</div>
);

export default injectIntl(Layout);

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	static async getInitialProps(context) {
		const propsx = await super.getInitialProps(context);
		const {
			req: { locale, localeDataScript }
		} = context;

		// Step 1: Create an instance of ServerStyleSheet
		const sheet = new ServerStyleSheet();

		// Step 2: Retrieve styles from components in the page
		const page = context.renderPage(App => props =>
			sheet.collectStyles(<App {...props} />)
		);

		// Step 3: Extract the styles as <style> tags
		const styleTags = sheet.getStyleElement();

		// Step 4: Pass styleTags as a prop
		// todo: propsx ile page ayni oalbilir mi ?
		return { ...page, styleTags, ...propsx, locale, localeDataScript };
	}

	render() {
		const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${this.props.locale}`;

		return (
			// eslint-disable-next-line jsx-a11y/html-has-lang
			<html style={{ background: '#EEE', color: '#444' }}>
				<Head>
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"
					/>
					<meta name="theme-color" content="#673ab7" />
					<meta
						httpEquiv="Content-Security-Policy"
						content="upgrade-insecure-requests"
					/>
					<link rel="manifest" href="static/manifest.json" />
					<link rel="icon" href="static/img/favicon.ico" />
					<link
						rel="stylesheet"
						href="https://code.getmdl.io/1.3.0/material.deep_purple-blue.min.css"
					/>
					{this.props.styleTags}
				</Head>
				<body>
					<Main />
					<script src={polyfill} />
					<NextScript />
					<script
						dangerouslySetInnerHTML={{
							__html: this.props.localeDataScript
						}}
					/>
					<script defer src="https://code.getmdl.io/1.3.0/material.min.js" />
				</body>
			</html>
		);
	}
}

import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';

import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { IntlProvider, addLocaleData } from 'react-intl';
import es from 'react-intl/locale-data/es';
import en from 'react-intl/locale-data/en';
import initStore from '../utils/store';
import Layout from '../Layout/Layout';

import 'bootstrap/dist/css/bootstrap.min.css';

if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
	Object.keys(window.ReactIntlLocaleData).forEach(lang => {
		addLocaleData(window.ReactIntlLocaleData[lang]);
		addLocaleData([...en, ...es]);
	});
}

// eslint-disable-next-line
const getMessages = (locale = 'en') => require(`../lang/${locale}.json`);

/* debug to log how the store is being used */
export default withRedux(initStore, {
	debug: typeof window !== 'undefined' && process.env.NODE_ENV !== 'production',
})(
	class MyApp extends App {
		constructor(props) {
			super(props);
			this.state = {
				locale: 'en',
			};
		}

		static async getInitialProps({ Component, ctx }) {
			const pageProps = {
				// Call page-level getInitialProps
				...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
			};
			const { req } = ctx;

			// eslint-disable-next-line no-underscore-dangle
			const { locale, messages } = req || window.__NEXT_DATA__.props;
			const initialNow = Date.now();

			return { pageProps, locale, messages, initialNow };
		}

		componentDidMount() {
			debugger;
			this.setLocale();
			this.props.store.subscribe(() => {
				const locale = this.props.store.getState().locale.payload;
				if (this.state.locale !== locale) {
					this.setLocale();
				}
			});
		}

		setLocale = () => {
			const locale = this.props.store.getState().locale.payload;
			if (this.state.locale !== locale) {
				this.setState({
					locale,
				});
			}
		};

		render() {
			const { Component, pageProps, locale, messages, store, initialNow } = this.props;
			return (
				<Container>
					<Head>
						<title>Todo App</title>
					</Head>
					<Provider store={store}>
						<IntlProvider
							locale={this.state.locale || locale}
							messages={(this.state.locale && getMessages(this.state.locale)) || messages}
							initialNow={initialNow}
						>
							<Layout>
								<Component setLocales={this.setLocale} {...pageProps} />
							</Layout>
						</IntlProvider>
					</Provider>
				</Container>
			);
		}
	},
);

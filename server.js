// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const IntlPolyfill = require('intl');

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const { readFileSync } = require('fs');
const { basename } = require('path');
const accepts = require('accepts');
const glob = require('glob');
const express = require('express');

const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './src', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

const supportedLanguages = glob.sync('./src/lang/*.json').map(f => basename(f, '.json'));

const localeDataCache = new Map();
const getLocaleDataScript = locale => {
	const lang = locale.split('-')[0];
	if (!localeDataCache.has(lang)) {
		const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
		const localeDataScript = readFileSync(localeDataFile, 'utf8');
		localeDataCache.set(lang, localeDataScript);
	}
	return localeDataCache.get(lang);
};
// eslint-disable-next-line
const getMessages = (locale = 'en') => require(`./src/lang/${locale}.json`);

const setLocale = req => {
	const accept = accepts(req);
	const locale = accept.language(supportedLanguages);
	req.locale = locale;
	req.localeDataScript = getLocaleDataScript(locale);
	req.messages = getMessages(locale);

	return req;
};

app
	.prepare()
	.then(_ => {
		const server = express();

		server.get('*', (req, res) => {
			setLocale(req);

			// todo:  burada neler oluyor incele
			if (req.url === '/sw.js' || req.url.startsWith('/precache-manifest')) {
				app.serveStatic(req, res, path.join(__dirname, '.next', req.url));
			} else {
				handle(req, res);
			}

		});


		server.listen(PORT, err => {
			if (err) throw err;

			console.log(`> Ready on http://localhost:${PORT}`);
		});
	})
	.catch(ex => {
		console.error(ex.stack);
		process.exit(1);
	});

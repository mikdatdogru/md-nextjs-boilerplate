// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const IntlPolyfill = require('intl');
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const { readFileSync } = require('fs');
const { basename } = require('path');
const { createServer } = require('http');
const accepts = require('accepts');
const glob = require('glob');

const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

const supportedLanguages = glob
	.sync('./lang/*.json')
	.map(f => basename(f, '.json'));

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
const getMessages = locale => {
	// eslint-disable-next-line global-require
	return require(`./lang/${locale}.json`);
};
const setLocale = req => {
	const accept = accepts(req);
	const locale = accept.language(supportedLanguages);
	req.locale = locale;
	req.localeDataScript = getLocaleDataScript(locale);
	req.messages = getMessages(locale);

	return req;
};

app.prepare().then(_ => {
	const server = createServer((req, res) => {
		setLocale(req);

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
});

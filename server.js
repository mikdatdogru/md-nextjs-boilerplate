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
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './src', dev });
const handle = app.getRequestHandler();

// Get the supported languages by looking for translations in the `language/` dir.
const languages = glob.sync('./src/language/*.json').map(f => basename(f, '.json'));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
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

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
// eslint-disable-next-line
const getMessages = locale => require(`./src/language/${locale}.json`);

const setLocale = req => {
  const accept = accepts(req);
  const locale = accept.language(languages);
  req.locale = locale;
  req.localeDataScript = getLocaleDataScript(locale);
  req.messages = getMessages(locale);

  return req;
};

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/p/:id', (req, res) => {

      const actualPage = '/post';
      const queryParams = { id: req.params.id };

      setLocale(req);

      console.log('geldi p');
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {

      setLocale(req);
      console.log('geldi *');
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;

      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { setSubscribe } from '../actions/common';
import store from '../utils/store';
import { withRedux } from '../utils';
import { bindActionCreators } from 'redux';

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}
const getMessages = locale => require(`../language/${locale}.json`);

export default Page => {
  const IntlPage = injectIntl(Page);

  return class PageWithIntl extends Component {
    static async getInitialProps(context) {
      let props;
      if (typeof Page.getInitialProps === 'function') {
        props = await Page.getInitialProps(context);
      }

      // Get the `locale` and `messages` from the request object on the server.
      // In the browser, use the same values that the server serialized.
      const { req } = context;
      const { locale, messages } = req || window.__NEXT_DATA__.props;

      // Always update the current time on page load/transition because the
      // <IntlProvider> will be a new instance even with pushState routing.
      const now = Date.now();

      return { ...props, locale, messages, now };
    }

    render() {
      const { locale, messages, now, ...props } = this.props;

      const storedLocale = store().getState().locale.lang;

      let lang;
      let message;
      if (storedLocale) {
        lang = storedLocale;
        message = getMessages(storedLocale);
      } else {
        lang = locale;
        message = messages;
      }

      /*
if (!store().getState().subscribe.subscribed) {
store().subscribe(() => {
lang = store().getState().locale.lang;
message = getMessages(store().getState().locale.lang);


});

store().dispatch(setSubscribe());
}
*/

      return (
        <IntlProvider locale={lang} messages={message} initialNow={now}>
          <IntlPage {...props} />
        </IntlProvider>
      );
    }
  };
};

/*

PageWithIntl.propTypes = {
disabled: PropTypes.objectOf(PropTypes.any).isRequired,
};
PageWithIntl.defaultProps = {
disabled: false,
};

export default PageWithIntl;
*/

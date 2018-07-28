import React from 'react'
import {FormattedMessage,defineMessages, injectIntl} from 'react-intl'
import Head from 'next/head';
import Link from 'next/link';
const linkStyle = {
  marginRight: 15,
};

const messages = defineMessages({
  title: {
    id: 'title',
    defaultMessage: 'React Intl Next.js Example'
  }
})

const Header = injectIntl(({intl, title, children}) => (
  <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>{title || intl.formatMessage(messages.title)}</title>
    </Head>
    <Link href="/">
      <a style={linkStyle}><FormattedMessage id='nav.home' defaultMessage='Asasayfa-' /></a>
    </Link>
    <Link href="/form">
      <a style={linkStyle}><FormattedMessage id='nav.forms' defaultMessage='Formlar-' /></a>
    </Link>

  </div>
));

export default Header;

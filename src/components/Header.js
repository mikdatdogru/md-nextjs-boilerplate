import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { setLocale } from '../actions/common';
import store from '../utils/store';

const linkStyle = {
  marginRight: 15,
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  languageChanger(lang) {
    store().dispatch(setLocale(lang));

    // fixme: dil degistiginde componento yeniden render etmenin yolunu bul
    location.reload();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  render() {
    const { lang } = store().getState().locale;

    return (
      <div>
        <div>
          <Link href="/home">
            <a style={linkStyle}>
              <FormattedMessage id="nav.home" defaultMessage="Homes" />
            </a>
          </Link>
          <Link href="/about">
            <a style={linkStyle}>
              <FormattedMessage id="nav.about" defaultMessage="Abouts" />
            </a>
          </Link>
        </div>

        <Dropdown
          isOpen={this.state.dropdownOpen}
          size="sm"
          toggle={this.toggle}
          className=" headerLanguage m-r-5 m-t-5"
        >
          <DropdownToggle color="transparent" caret>
            {lang}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Secim yapin</DropdownItem>
            <DropdownItem onClick={() => this.languageChanger('tr')}>
              <i className="flag-icon flag-icon-tr h5" /> tr
            </DropdownItem>
            <DropdownItem onClick={() => this.languageChanger('en')}>
              <i className="flag-icon flag-icon-us h5" /> en
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

Header.propTypes = {};
Header.defaultProps = {};

export default Header;

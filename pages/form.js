import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../layouts/Header';
import MainLayout from '../layouts/MainLayout';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { listMovie } from '../actions/common';
import api from '../utils/api';

class Form extends Component {
  static async getInitialProps({ reduxStore, req }) {
    const isServer = !!req;

    const data = await api.getMovie('batman');

    reduxStore.dispatch(listMovie(data));
    console.log(`Show data fetched. Count: ${data.length}`);
    return {
      shows: {
        payload:data
      },
    };
  }

  render() {
    return (
      <MainLayout>
        <h1>Batman TV Shows</h1>
        <ul>
          {this.props.shows.payload.map(({ show }) => (
            <li key={show.id}>
              <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                <a>{show.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>{`
          h1,
          a {
            font-family: 'Arial';
          }

          ul {
            padding: 0;
          }

          li {
            list-style: none;
            margin: 5px 0;
          }

          a {
            text-decoration: none;
            color: blue;
          }

          a:hover {
            opacity: 0.6;
          }
        `}</style>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  shows: state.sampleData,
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

import Link from 'next/link';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout';
import { initStore } from '../store';
import {getMovie} from '../actions/common';
import { withRedux } from '../utils';

const Index = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({ show }) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>

    <style jsx>
      {`
        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
          font-family: 'Arial';
        }

        a:hover {
          opacity: 0.6;
        }
      `}
    </style>
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data,
  };
};

Index.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.any).isRequired,
};
Index.defaultProps = {};

const mapDispatchToProps = dispatch => {
  return {
    /*addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch),*/
  };
};
export default withRedux(initStore, null, mapDispatchToProps)(Index);

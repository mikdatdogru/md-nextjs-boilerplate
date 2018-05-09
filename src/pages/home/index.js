import Link from 'next/link';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import { bindActionCreators } from 'redux';
import Layout from '../../components/Layout';
import { withRedux, store } from '../../utils/index';
import pageWithIntl from '../../components/PageWithIntl';

import { getMovieList } from '../../actions/common';

const Home = props => (
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

Home.getInitialProps = async context => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  const movie = await context.store.dispatch(getMovieList('batman'));

  return {
    shows: movie.data,
  };
};

Home.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.any).isRequired,
};
Home.defaultProps = {};

const mapDispatchToProps = dispatch => ({
  getMovieList: bindActionCreators(getMovieList, dispatch),
});
export default pageWithIntl(withRedux(store, null, mapDispatchToProps)(Home));

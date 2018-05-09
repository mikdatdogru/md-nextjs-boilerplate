import Router from 'next/router';

const Index = () => {};

Index.getInitialProps = async ({ res }) => {
  if (res) {
    res.writeHead(302, {
      Location: '/home',
    });
    res.end();
    res.finished = true;
  } else {
    Router.replace('/home');
  }
  return {};
};

export default Index;

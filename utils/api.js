import fetch from 'isomorphic-unfetch';



export default {
   getMovie: data =>
     fetch(`https://api.tvmaze.com/search/shows?q=${data}`)
       .then(r => r.json() )
       .then(res => res),
  auth: data =>
    fetch('/foo.json')
      .then(r => r.json() )
      .then(res => res),
};

import axios from 'axios';

const { apiUrl } = 'http://localhost:1909';

export default {
  postEx: data => axios.post(`${apiUrl}/postEx`, { data }).then(res => res),

  auth: data =>
    axios({
      method: 'post',
      url: `${apiUrl}/auth`,
      data,
    }).then(res => res),
  getMovie: id =>
    axios({
      method: 'get',
      url: `https://api.tvmaze.com/shows/${id}`,
    }).then(res => res),
  getMovieList: search =>
    axios({
      method: 'get',
      url: `https://api.tvmaze.com/search/shows?q=${search}`,
    }).then(res => res),
};

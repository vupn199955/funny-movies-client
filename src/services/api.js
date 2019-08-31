const baseUrl = "http://localhost:5000/api/";

const makeRequest = async (method, endPoint, data) => {
  const token = localStorage.getItem('token');
  const res = await fetch(baseUrl + endPoint, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type" : "application/json; charset=utf-8",
      "Authorization" : token
    }
  });

  if (res.status === 404) {
    localStorage.removeItem('token');
    return Promise.reject();
  }

  return await res.json();
}
export const login = (data) => {
  return makeRequest('post', 'users/login', data);
}

export const getUserInfo = () => {
  return makeRequest('get', 'users/access-info');
}

export const getMovies = () => {
  return makeRequest('get', 'movies');
}

export const shareMovie = (videoId) => {
  return makeRequest('get', 'movies/share/' + videoId);
}
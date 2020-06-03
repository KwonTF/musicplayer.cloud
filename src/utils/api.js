const endpoint = process.env.REACT_APP_USE_LOCAL_ENDPOINT
  ? 'http://localhost:5000'
  : 'https://api.musicplayer.cloud';

export default {
  endpoint,
};

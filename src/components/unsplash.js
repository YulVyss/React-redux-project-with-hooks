import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';

export const accessKey = '5d139d49dd0559b26a263cc4ebc346f2005a4a761ee32e6890475b167c8d6bbc';

export const unsplash = createApi({
  accessKey: accessKey,
  fetch: nodeFetch,
  redirect_uri: 'http://localhost:3000/photos', // manual, *follow, error
  response_type: 'code',
  scope: 'public write_likes read_photos write_user',
});
let req = {
  accessKey: accessKey,
  redirect_uri: 'http://localhost:3000/photos',
  response_type: 'code'
}
let url = '';
url += 'client_id=' + req.accessKey + "&";
url += 'redirect_uri=' + req.redirect_uri + "&";
url += 'response_type=' + req.response_type;


export const urlAuth = "https://unsplash.com/oauth/authorize?" + url;


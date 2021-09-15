import React from 'react'
import nodeFetch from 'node-fetch';
import Unsplash, { toJson } from 'unsplash-js';

global.fetch = fetch

const accessKey = '5d139d49dd0559b26a263cc4ebc346f2005a4a761ee32e6890475b167c8d6bbc';
// const Unsplash = require('unsplash-js').default;
// const toJson = require('unsplash-js').toJson;

export const unsplash = new Unsplash({
  accessKey: accessKey,
  secret: "0417212b15c877ff348acba7c70d083fb805d8bd4bb99d3dfd195397a7a0e94d",
  // fetch: nodeFetch,
  callbackUrl: 'http://localhost:3000/photos', // manual, *follow, error
  response_type: 'code',
  // scope: 'public',
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_likes",
])


export default function Authentication() {
  return (
    <div className="container auth">
      <h2 className="auth__title">Для просмотра коллекции фотографий необходимо<br />
        пройти авторизацию на сайте</h2>
      <a className="auth__link" href={authenticationUrl}>Unsplash.com</a>
    </div>
  )
}

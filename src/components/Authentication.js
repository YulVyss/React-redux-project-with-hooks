import React from 'react'
import { authenticationUrl } from '../App'


export default function Authentication() {
  return (
    <div className="container auth">
      <h2 className="auth__title">Для просмотра коллекции фотографий необходимо<br />
        пройти авторизацию на сайте</h2>
      <a className="auth__link" href={authenticationUrl}>Unsplash.com</a>
    </div>
  )
}

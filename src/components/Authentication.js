import React from 'react'
import { urlAuth } from './unsplash';

export default function Authentication() {
  return (
    <div className="container auth">
      <h2 className="auth__title">Для просмотра коллекции фотографий необходимо<br />
        пройти авторизацию на сайте</h2>
      <a className="auth__link" href={urlAuth}>Unsplash.com</a>
    </div>
  )
}

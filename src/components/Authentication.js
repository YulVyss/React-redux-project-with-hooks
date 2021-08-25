import React from 'react'
import { urlAuth } from './unsplash';

export default function Authentication() {
  return (
    <div>
      <h2>Для просмотра коллекции фотографий необходимо<br />
        пройти авторизацию на сайте</h2>
      <a href={urlAuth}>Unsplash.com</a>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div>
      <div className="container" >
        <Link to="/photos" className="link-to-back">&#706;&#706; Photos</Link>
        <h2 className="error__title">Error 404</h2>
        <p className="error__text">No data found</p>
      </div>
    </div>
  )
}

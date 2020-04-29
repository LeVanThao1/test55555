import React from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'

const Setting = () => {
  const { section } = queryString.parse(useLocation().search);
  return <div>
    {section ? <h2>Setting page - Section: {section} </h2>:<h2>Setting page </h2>}
  </div>
}

export default Setting
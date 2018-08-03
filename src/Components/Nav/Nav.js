import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav (props){
  return(
    <div>
      <h1>Social Dash</h1>
      <Link to='/settings'>
        <button>Settings</button>
      </Link>
    </div>
  )

}
import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav (props){
  return(
    <div>
      <Link to='/settings'>
        <button>Settings</button>
      </Link>
    </div>
  )

}
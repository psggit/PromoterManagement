import React from 'react'
import './toggle.scss'

export default function Toggle(props) {
  return (
    <div className="toggle">
      <input
        type="checkbox"
        checked={props.value} onChange={e => {
          e.preventDefault()
          props.onChange(e.target.checked)
        }} />
      <span className="toggle-switch"></span>
      <span className="bg"></span>
    </div>
  )
}
import React from 'react'
import "./select.scss"

export default function Select(props) {
  return (
    <select
      {...props}
      style={{ width: props.width || "225px" }}
      name={props.name}
    >
      {/* {
        props.name && props.value === -1 &&
        <option value="" disabled selected>
          Choose a {props.name}
        </option>
      } */}
      {
        props.options.map((item, i) => {
          return <option key={i} value={props.value} >{props.labelMapping ? item[props.labelMapping] : item}</option>
        })
      }
    </select>
  )
}
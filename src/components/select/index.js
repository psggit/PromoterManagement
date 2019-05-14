import React from 'react'
import "./select.scss"

export default function Select(props) {
  return (
    <select
      //placeholder={this.props.placeholder}
      className={`select`}
      name={props.name}
      // value={this.props.value ? this.props.value : this.state.value}
      {...props}
    >
      {
        props.name && props.value === -1 &&
        <option value="" disabled selected>
          Choose a {props.name}
        </option>
      }
      {
        props.options.map((item, i) => (
          <option key={i} value={item.value}>{item.text}</option>
        ))
      }
    </select>
  )
}
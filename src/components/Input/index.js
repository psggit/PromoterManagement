import React from "react"
import "./input.scss"

export default function Input(props) {
  return (
    <input
      style={{ width: props.width }}
      spellCheck="false"
      autoComplete="falsfwfewfe"
      className="react--input"
      type={props.type || "text"}
      {...props}
    />
  )
}
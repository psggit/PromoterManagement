import React from "react"
import Icons from "./icon"
import "./icon.scss"

export default function Icon(props) {
  return <span onClick={props.onClick} className="react--icon" {...props}>{Icons[props.name]}</span>
}
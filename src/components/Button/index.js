import React from "react"
import "./button.scss"

function getClassName(size = 36, appearance) {
  let className
  if (appearance === "primary") {
    className = "btn--primary"
  } else if (appearance === "secondary") {
    className = "btn--secondary"
  }

  if (size && size === "small") {
    className = `${className} btn--sm`
  }
  return className
}

export default function Button({ onClick, disabled, children, width, size, appearance }) {
  return (
    <button
      style={{ width }}
      disabled={disabled}
      onClick={onClick}
      className={`btn ${getClassName(size, appearance)}`}>
      {children}
    </button>
  )
}
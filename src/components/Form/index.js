import React from "react"
import "./form.scss"

export function FormGroup({ children, inline }) {
  return (
    <div className={`form--group ${inline ? "form--inline" : ""}`}>
      {children}
    </div>
  )
}

export function Form({ onSubmit, width, children }) {
  console.log("submit", onSubmit)
  return (
    <form style={{ width }} onSubmit={onSubmit || undefined} className="form" autoComplete="dfgdf">
      {children}
    </form>
  )
}
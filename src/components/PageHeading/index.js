import React from "react"
import "./page-heading.scss"

export default function PageHeading({ children }) {
  return <h2 className="page--heading">{children}</h2>
}
import React, { useState } from "react"
import "./header.scss"
import { authLogout } from "../../Api";
import { clearSession, getSession } from "Utils/session"
import { NavLink } from "react-router-dom"

export default function Header({ history }) {
  const session = getSession()
  const hasuraID = session ? session.hasura_id : null
  const handleClick = e => {
    e.preventDefault()
    authLogout()
      .then(json => {
        clearSession()
        history.push("/admin/login")
      })
      .catch(err => { console.log(err) })
  }
  return (
    <div className="header">
      <NavLink to="/admin"><h2>Promoter Management</h2></NavLink>
      <p onClick={handleClick} >Logout (Hasura ID: {hasuraID})</p>
    </div>
  )
}
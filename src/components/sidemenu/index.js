import React from "react"
import "./sidenav.scss"
import { NavLink } from "react-router-dom"

const items = [
  { label: "List Promoters", href: "/admin/promoters" },
  // { label: "Upload KYC", href: "/consumer/update" },
  // { label: "Consumer Detail", href: "/consumer/detail" },
  // { label: "Consuemr SOA", href:"/consumer/soa" },
  // { label: "Consumer Issues", href: "/consumer/issues" },
  // { label: "Consumer Notes", href: "/consumer/notes" },
  // { label: "Create Note", href: "/consumer/notes/create" }
]

function SideMenu() {
  const active = location.pathname
  return (
    <div className="sidenav">
      {
        items.map((item, i) => (
          <NavLink className={`sidenav--item ${active === item.href ? "active" : ""}`} key={i} to={item.href}>{item.label}</NavLink>
        ))
      }
    </div>
  )
}

export default SideMenu
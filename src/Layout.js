import React from "react"
import SideNav from "Components/sidemenu"
import Header from "Components/header"

function Layout({ history, children }) {
  return (
    <React.Fragment>
      <Header history={history} />
      <div style={{
        height: "calc(100vh - 78px)",
        position: "fixed",
        left: 0,
        top: "78px",
      }}>
        <SideNav />
      </div>
      <div style={{ margin: "78px 0 0 240px", padding: "40px" }}>
        {children}
      </div>
    </React.Fragment>
  )
}

export default Layout
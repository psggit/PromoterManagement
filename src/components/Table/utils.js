import React from "react"
import { unmountComponentAtNode, render } from "react-dom"
import "./table.scss"
import { Router } from "react-router"
import { createBrowserHistory } from "history"

const history = createBrowserHistory()

export function mountTableActionsMenu(position, actionItems, history) {
  const style = {
    position: "absolute",
    top: position.top + 10,
    left: position.left + 10
  }
  const ActionMenu = (
    <div style={style} className="table--action-menu">
      {actionItems}
    </div>
  )
  render(<Router history={history}>{ActionMenu}</Router>, document.getElementById("fixed--position-el"))
}

export function unmountTableActionsMenu(e) {
  if (e.target.parentNode.className !== "table--action-menu") {
    unmountComponentAtNode(document.getElementById("fixed--position-el"))
  }
}
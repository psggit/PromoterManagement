import React from "react"
import Pagination from "react-js-pagination"
import "./pagination.scss"

export default function ReactPagination(props) {
  const offset = props.itemsCountPerPage * (props.activePage - 1)
  return <Pagination {...props} onChange={(active) => { props.setPage(active, offset) }} />
}
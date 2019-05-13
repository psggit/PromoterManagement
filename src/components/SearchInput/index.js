/**
 * This is a simple example of function composition.
 * "SearchInput" is a molecule made up of atoms named "Input" and "Icon"
 * */

import React from "react"
import Input from "./../Input"
import Icon from "./../Icon"
import "./SearchInput.scss"

export default function SearchInput(props) {
  return (
    <div className="search--input">
      <Input
        type="text"
        value={props.filterValue}
        onChange={(e) => { props.setFilterValue(e.target.value) }}
        placeholder={props.placeholder}
      />
      {
        props.filterValue.length
          ? <Icon
            onClick={props.reset}
            name="cross-circle"
          />
          : ""
      }
    </div>
  )
}
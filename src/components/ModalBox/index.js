import React, { useState, useEffect } from "react"
import "./ModalBox.scss"

export function ModalHeader({ children }) {
  return (
    <div className="modal--box__header">
      {children}
    </div>
  )
}

export function ModalFooter({ children }) {
  return (
    <div className="modal--box__footer">
      {children}
    </div>
  )
}

export function ModalBody({ children }) {
  return (
    <div className="modal--box__body">
      {children}
    </div>
  )
}

export function ModalBox(props) {
  return (
    <div className="modal--box">
      <div className="modal--box__overlay">
        <div className="modal--box__container">
          {props.children}
        </div>
      </div>
    </div>
  )
}


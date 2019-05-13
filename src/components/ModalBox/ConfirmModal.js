import React from "react"
import { ModalBox, ModalHeader, ModalBody, ModalFooter } from "./index"
import Button from "Components/Button"
import { unmountModal } from "Components/ModalBox/api"
import "./ConfirmModal.scss"

export default function ConfirmModal(props) {
  return class ConfirmModal extends React.Component {
    render() {
      const { title, message, handleConfirm } = props
      return (
        <div id="confirm-modal">
          <ModalBox>
            <ModalHeader><h3>{title}</h3></ModalHeader>
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
              <Button onClick={unmountModal}>Cancel</Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </ModalFooter>
          </ModalBox>
        </div>
      )
    }
  }
}
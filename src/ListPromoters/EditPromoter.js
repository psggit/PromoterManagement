import React from "react"
import TitleAndSave from "Components/ModalBox/TitleAndSave"
import { unmountModal } from "Components/ModalBox/api"

export default function EditPromoter(props) {
  return class EditPromoter extends React.Component {
    componentDidMount() {
      /** fetch states, ciities and retailers */
    }
    handleSave() {

    }
    render() {
      return (
        <TitleAndSave title="Edit promoter" handleSave={this.handleSave}>
          <select>

          </select>
        </TitleAndSave>
      )
    }
  }
}
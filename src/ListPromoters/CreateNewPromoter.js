import React, { useState, useEffect } from "react"
import TitleAndSave from "Components/ModalBox/TitleAndSave"
import { unmountModal } from "Components/ModalBox/api"
import Input from "Components/Input"
import { Form, FormGroup } from "Components/Form"
import Toggle from "Components/Toggle"
import { createPromoter } from "../Api";

export default function CreateNewPromoter(props) {
  return class CreateNewPromoter extends React.Component {
    constructor() {
      super()
      this.state = {
        states: [],
        stores: []
      }
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
      this.handleTextChange = this.handleTextChange.bind(this)
    }
    componentDidMount() {
      /** fetch states, ciities and retailers */
    }
    handleCheckboxChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    handleTextChange(e) {
      this.setState({
        [e.target.name]: e.target.checked
      })
    }
    handleSubmit() {
      const { name, email, mobile_number, is_active } = this.state
      const createPromoterReq = {
        name,
        email,
        mobile_number,
        is_active
      }
      createPromoter(createPromoterReq)
        .then(createPromoterRes => {
          unmountModal()
          alert()
        })
    }
    render() {
      return (
        <TitleAndSave title="Create Promoter" handleSave={this.handleSave}>
          <select onChange={(e) => { this.setIssueId(e.target.value) }}>
            {
              this.state.states.map((item, i) => (
                <option key={item.id} value={item.id}>{item.city_name}</option>
              ))
            }
          </select>
          <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
            <Form width="300px">
              <FormGroup inline>
                <label>Name</label>
                <Input name="name" onChange={this.handleTextChange} />
              </FormGroup>
              <FormGroup inline>
                <label>Email</label>
                <Input name="email" onChange={this.handleTextChange} />
              </FormGroup>
              <FormGroup inline>
                <label>Phone</label>
                <Input name="mobile_number" onChange={this.handleTextChange} />
              </FormGroup>
              <FormGroup inline>
                <label>Status</label>
                <div style={{ marginRight: "200px" }}>
                  <Input name="is_active" type="checkbox" onChange={this.handleCheckboxChange} />
                </div>
              </FormGroup>
            </Form>
          </div>
        </TitleAndSave>
      )
    }
  }
}
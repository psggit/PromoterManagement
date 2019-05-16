import React, { useState, useEffect } from "react"
import TitleAndSave from "Components/ModalBox/TitleAndSave"
import { unmountModal } from "Components/ModalBox/api"
import Input from "Components/Input"
import Select from "Components/select"
import { Form, FormGroup } from "Components/Form"
import Toggle from "Components/Toggle"
import { createPromoter, fetchStatesandCities, fetchRetailers } from "../Api";
import { formatStateAndCityList, emailRegex } from "Utils/helpers"

export default function CreateNewPromoter(props) {
  return class CreateNewPromoter extends React.Component {
    constructor() {
      super()
      this.state = {
        cities: [],
        retailers: [],
        states: [],
        password: "",
        email: "",
        mobile_number: "",
        emailErr: {
          value: "",
          status: false
        },
        mobileErr: {
          value: "",
          status: false
        },
        passwordErr: {
          value: "",
          status: false
        }
      }
      this.statusOptions = [
        { text: "Active", value: 1 },
        { text: "Inactive", value: 2 }
      ]
      this.handleTextChange = this.handleTextChange.bind(this)
      this.handleSave = this.handleSave.bind(this)
      this.isFormValid = this.isFormValid.bind(this)
      this.handleStateChange = this.handleStateChange.bind(this)
      this.handleCityChange = this.handleCityChange.bind(this)
      this.setStates = this.setStates.bind(this)
    }
    componentDidMount() {
      /** fetch states, ciities and retailers */
      fetchStatesandCities()
        .then((response) => {
          this.setStates(response.states)
          this.setCities(response.states)
        })
        .catch(err => {
          console.log(err)
        })
    }

    setRetailers(retailers) {
      this.setState({ retailers })
    }

    setStates(states) {
      this.setState({ states })
    }

    setCities(states) {
      const { cities } = states[0]
      this.setState({ cities: states[0].cities })

      const fetchRetailersReq = {
        offset: 0,
        limit: 1000,
        filter: {
          column: "CityName",
          operator: "CASEIGNORE",
          value: cities[0].city_name
        }
      }
      fetchRetailers(fetchRetailersReq)
        .then(fetchRetailersRes => {
          this.setRetailers(fetchRetailersRes.ret_response || [])
        })
        .catch(err => {
          console.log(err)
        })
    }

    handleCheckboxChange(e) {
      this.setState({
        [e.target.name]: e.target.checked
      })
    }

    handleTextChange(e) {
      const errName = `${e.target.name}Err`
      this.setState({
        [e.target.name]: e.target.value,
        [errName]: { status: false, value: "" }
      })
    }

    getCityNameById(cities, city_id) {
      return cities.find(item => item.city_id === parseInt(city_id)).city_name
    }

    handleStateChange(e) {
      const state_id = e.target.value
      const updatedCities = this.state.states.find(item => item.state_id === parseInt(state_id)).cities
      this.setState({ cities: updatedCities })

      const fetchRetailersReq = {
        offset: 0,
        limit: 1000,
        filter: {
          column: "CityName",
          operator: "CASEIGNORE",
          value: updatedCities[0].city_name
        }
      }
      fetchRetailers(fetchRetailersReq)
        .then(fetchRetailersRes => {
          this.setRetailers(fetchRetailersRes.ret_response || [])
        })
        .catch(err => {
          console.log(err)
        })
    }

    handleCityChange(e) {
      const city_id = e.target.value
      const fetchRetailersReq = {
        offset: 0,
        limit: 1000,
        filter: {
          column: "CityName",
          operator: "CASEIGNORE",
          value: this.getCityNameById(this.state.cities, city_id)
        }
      }
      fetchRetailers(fetchRetailersReq)
        .then(fetchRetailersRes => {
          this.setRetailers(fetchRetailersRes.ret_response || [])
        })
        .catch(err => {
          console.log(err)
        })
    }

    isFormValid() {
      const { email, mobile_number, password } = this.state
      if (this.state.email.trim().length === 0) {
        this.setState({
          emailErr: {
            value: "Email is required",
            status: true
          }
        })
        return false
      }
      if (!emailRegex.test(this.state.email.trim())) {
        this.setState({
          emailErr: {
            value: "Email is invalid",
            status: true
          }
        })
        return false
      }
      if (this.state.mobile_number.trim().length === 0) {
        this.setState({
          mobileErr: {
            value: "Mobile number is required",
            status: true
          }
        })
        return false
      }
      if (this.state.password.trim().length === 0) {
        this.setState({
          passwordErr: {
            value: "Password is required",
            status: true
          }
        })
        return false
      }
      return true
    }

    handleSave() {
      if (this.isFormValid()) {
        const {
          name,
          email,
          mobile_number,
          password
        } = this.state

        const createPromoterReq = {
          name,
          email,
          mobile_number,
          is_active: this.statusRef.value === "1" ? true : false,
          store_id: parseInt(this.retailerRef.value),
          state_id: parseInt(this.stateRef.value),
          city_id: parseInt(this.cityRef.value),
          password
        }
        createPromoter(createPromoterReq)
          .then(createPromoterRes => {
            unmountModal()
            alert(createPromoterRes.message)
            props.history.push("/admin/promoters")
          })
      }
    }

    render() {
      const { emailErr, mobileErr, passwordErr } = this.state
      return (
        <TitleAndSave title="Create Promoter" handleSave={this.handleSave}>
          <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
            <Form width="300px">
              <FormGroup inline>
                <label>Name</label>
                <Input name="name" onChange={this.handleTextChange} />
              </FormGroup>
              <FormGroup inline>
                <label>Email *</label>
                <Input name="email" onChange={this.handleTextChange} />
              </FormGroup>
              {
                emailErr.status &&
                <p className="error-message">* {emailErr.value}</p>
              }
              <FormGroup inline>
                <label>Phone *</label>
                <Input maxLength="10" name="mobile_number" onChange={this.handleTextChange} />
              </FormGroup>
              {
                mobileErr.status &&
                <p className="error-message">* {mobileErr.value}</p>
              }
              <FormGroup inline>
                <label>Password *</label>
                <Input name="password" onChange={this.handleTextChange} />
              </FormGroup>
              {
                passwordErr.status &&
                <p className="error-message">* {passwordErr.value}</p>
              }

              <FormGroup inline>
                <label>State</label>
                <select ref={(node) => { this.stateRef = node }} onChange={this.handleStateChange}>
                  {this.state.states.map(item => (
                    <option key={item.state_id} value={item.state_id}>{item.state_name}</option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup inline>
                <label>City</label>
                <select ref={(node) => { this.cityRef = node }} onChange={this.handleCityChange}>
                  {this.state.cities.map(item => (
                    <option key={item.city_id} value={item.city_id}>{item.city_name}</option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup inline>
                <label>Store</label>
                <select ref={(node) => { this.retailerRef = node }}>
                  {this.state.retailers.map(item => (
                    <option key={item.id} value={item.id}>{item.outlet_name}</option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup inline>
                <label>Status</label>
                <select ref={(node) => { this.statusRef = node }}>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </FormGroup>
            </Form>
          </div>
        </TitleAndSave>
      )
    }
  }
}
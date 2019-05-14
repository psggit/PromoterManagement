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
        states: [],
        stores: [],
        // is_active: true,
        selectedStoreIdx: -1,
        stateList: [],
        retailerList: [],
        selectedStateIdx: -1,
        cityList: [],
        password: "",
        email: "",
        mobile_number: "",
        selectedCityIdx: -1,
        selectedStatusIdx: 1,
        stateMap: {},
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
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
      this.handleTextChange = this.handleTextChange.bind(this)
      this.formatResponse = this.formatResponse.bind(this)
      this.updateCityList = this.updateCityList.bind(this)
      this.handleSave = this.handleSave.bind(this)
      this.isFormValid = this.isFormValid.bind(this)
      this.handleSelectChange = this.handleSelectChange.bind(this)
    }
    componentDidMount() {
      /** fetch states, ciities and retailers */
      fetchStatesandCities({})
        .then((response) => {
          this.formatResponse(response)
        })
        .catch((err) => {
          console.log("Error in fetching state and city list", err)
        })
    }

    formatResponse(data) {
      const { stateList, cityList, stateMap } = formatStateAndCityList(data.states)
      this.setState({
        stateList,
        selectedStateIdx: stateList[0].value,
        cityList,
        selectedCityIdx: cityList[0].value,
        stateMap
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

    handleSelectChange(e) {
      const selectedField = `selected${e.target.name}Idx`
      this.setState({ [selectedField]: e.target.value })
      switch (e.target.name) {
        case 'City':
          console.log("city", this.state.cityList, e.target.value, this.state.cityList[e.target.value])
          this.fetchRetailerList(e.target.value)
          break;
        case 'State':
          this.updateCityList(e.target.value)
          break;
      }
    }

    updateCityList(stateId) {
      this.setState({
        cityList: this.state.stateMap[stateId],
        selectedCityIdx: this.state.stateMap[stateId][0].value
      })
    }

    fetchRetailerList(cityId) {
      const cityName = this.state.cityList.find((item) => parseInt(item.value) === parseInt(cityId)).text
      fetchRetailers({
        filter: {
          column: "CityName",
          operator: "CASEIGNORE",
          value: cityName
        },
        limit: 10000,
        offset: 0
      })
        .then((response) => {
          const retailerList = response.ret_response.map((item) => {
            return {
              text: item.outlet_name,
              value: item.id
            }
          })
          this.setState({
            retailerList,
            selectedStoreIdx: retailerList[0].value
          })
        })
        .catch((err) => {
          console.log("Error in fetching retailer list", err)
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
      //console.log("prope", this.props)
      if (this.isFormValid()) {
        const {
          name,
          email,
          mobile_number,
          selectedStatusIdx,
          selectedCityIdx,
          selectedStateIdx,
          selectedStoreIdx,
          password
        } = this.state

        const createPromoterReq = {
          name,
          email,
          mobile_number,
          is_active: parseInt(selectedStatusIdx) === 1 ? true : false,
          store_id: parseInt(selectedStoreIdx),
          state_id: parseInt(selectedStateIdx),
          city_id: parseInt(selectedCityIdx),
          password
        }
        createPromoter(createPromoterReq)
          .then(createPromoterRes => {
            unmountModal()
            alert(createPromoterRes.message)
            console.log("props", this.props)
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
                <Input name="mobile_number" onChange={this.handleTextChange} />
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
                <Select
                  options={this.state.stateList}
                  name="State"
                  onChange={e => this.handleSelectChange(e)}
                  value={parseInt(this.state.selectedStateIdx)}
                />
              </FormGroup>
              <FormGroup inline>
                <label>City</label>
                <Select
                  options={this.state.cityList}
                  name="City"
                  onChange={e => this.handleSelectChange(e)}
                  value={parseInt(this.state.selectedCityIdx)}
                />
              </FormGroup>
              <FormGroup inline>
                <label>Store</label>
                <Select
                  options={this.state.retailerList}
                  name="Store"
                  onChange={e => this.handleSelectChange(e)}
                  value={parseInt(this.state.selectedStoreIdx)}
                />
              </FormGroup>
              <FormGroup inline>
                <label>Status</label>
                {/* <Input
                  name="is_active"
                  checked={this.state.is_active}
                  type="checkbox"
                  onChange={this.handleCheckboxChange}
                /> */}
                <Select
                  options={this.statusOptions}
                  name="Status"
                  onChange={e => this.handleSelectChange(e)}
                  value={parseInt(this.state.selectedStatusIdx)}
                />
              </FormGroup>
            </Form>
          </div>
        </TitleAndSave>
      )
    }
  }
}
import React from "react"
import TitleAndSave from "Components/ModalBox/TitleAndSave"
import { unmountModal } from "Components/ModalBox/api"
import { Form, FormGroup } from "Components/Form"
import { fetchRetailers, fetchStatesandCities, editPromoter } from "../Api"

export default function EditPromoter(props) {
  return class EditPromoter extends React.Component {
    constructor() {
      super()
      this.state = {
        states: [],
        cities: [],
        retailers: []
      }
      this.handleSave = this.handleSave.bind(this)
      this.handleStateChange = this.handleStateChange.bind(this)
      this.handleCityChange = this.handleCityChange.bind(this)
      this.setStates = this.setStates.bind(this)
      this.setCities = this.setCities.bind(this)
      this.setRetailers = this.setRetailers.bind(this)
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

    getCityNameById(cities, city_id) {
      return cities.find(item => item.city_id === parseInt(city_id)).city_name
    }

    setStates(states) {
      this.setState({ states })
    }

    setRetailers(retailers) {
      this.setState({ retailers })
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

    handleSave() {
      const editPromoterReq = {
        id: props.id,
        store_id: parseInt(this.retailerRef.value),
        state_id: parseInt(this.stateRef.value),
        city_id: parseInt(this.cityRef.value)
      }
      editPromoter(editPromoterReq)
        .then(editPromoterRes => {
          unmountModal()
          alert(editPromoterRes.message)
          props.history.push("/admin/promoters")
        })
        .catch(err => {
          unmountModal()
          console.log(err)
        })
    }
    render() {
      return (
        <TitleAndSave title={`Edit promoter (${props.name})`} handleSave={this.handleSave}>
          <Form>
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
          </Form>
        </TitleAndSave>
      )
    }
  }
}
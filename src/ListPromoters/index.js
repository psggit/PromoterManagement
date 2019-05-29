import React from "react"
import { useEffect, useState } from "react"
import { fetchPromoters, updatePromoterStatus } from "../Api"
import Table from "Components/Table"
import { mountTableActionsMenu } from "Components/Table/utils"
import SearchInput from "Components/SearchInput"
import { Form } from "Components/Form"
import PageHeading from "Components/PageHeading"
import Pagination from "react-js-pagination"
import Toggle from "Components/Toggle"
import {
  getOffsetUsingPageNo,
  getQueryParamByName,
  getQueryUri
} from "../utils/helpers"

import Button from "Components/Button"
import { unmountTableActionsMenu } from "Components/Table/utils";
import { NavLink } from "react-router-dom";
import ConfirmModal from "Components/ModalBox/ConfirmModal"
import CreateNewPromoter from "./CreateNewPromoter"
import EditPromoter from "./EditPromoter"
import { mountModal, unmountModal } from "Components/ModalBox/api"

export default function ListPromoters(props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const searchValue = getQueryParamByName("search") || ""
  const limit = 20
  const [promoters, setPromoters] = useState([])
  const [promotersCount, setPromotersCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(pageNo)
  const [activeOffset, setActiveOffset] = useState(getOffsetUsingPageNo(pageNo, limit))
  const [toggleData, setToggleData] = useState(false)

  /** 
   * filterValue will change for onChange event, but
   * finalFilterValue will be used for applying filter 
   * */
  const [filterValue, setFilterValue] = useState(searchValue)
  const [finalFilterValue, setFinalFilterValue] = useState(searchValue)

  const reset = () => {
    props.history.push("/admin/promoters")
  }

  /** Filter will be applied only on submit  */
  const handleFilterSubmit = e => {
    e.preventDefault()
    setFinalFilterValue(filterValue)
    /** reset pagination if filter is applied */
    setActiveOffset(0)
    setActivePage(1)
    props.history.push(`/admin/promoters?search=${filterValue}&page=${1}`)
  }

  /** change url based on pagination/search  */
  const handlePageUrl = (searchValue, pageNo) => {
    const queryObj = {}
    if (searchValue.length) {
      queryObj.search = searchValue
    }
    if (pageNo) {
      queryObj.page = pageNo
    }
    props.history.push(`/admin/promoters${getQueryUri(queryObj)}`)
  }

  const fetchPromotersReq = {
    limit: limit,
    offset: activeOffset
  }

  if (filterValue.length === 0 && finalFilterValue.length) {
    reset()
  }

  /** attach filter in fetchCosumerReq object if is there */
  if (finalFilterValue.length > 0) {
    /** Check whether the filter text is phone no. or email */
    const isPhoneNo = isNaN(filterValue) === false
    fetchPromotersReq.filter = {
      filterBy: isPhoneNo ? "Mobile" : "Email",
      value: filterValue
    }
  }

  /** Api call for fetching promoters  */
  useEffect(() => {
    setLoadingState(false)
    fetchPromoters(fetchPromotersReq)
      .then(fetchPromotersRes => {
        setPromotersCount(fetchPromotersRes.count)
        setPromoters(fetchPromotersRes.promoter)
        setLoadingState(true)
      })
      .catch(err => {
        console.log(err)
        setLoadingState(true)
      })
  }, [activeOffset, finalFilterValue, toggleData])

  const tableColumns = [
    {
      name: "ID",
      mapping: "id",
      // fn: id => <NavLink to={`/admin/promoters/detail/${id}`}>{id}</NavLink>
    },
    {
      name: "Name",
      mapping: "name"
    },
    {
      name: "Email",
      mapping: "email"
    },
    {
      name: "Store name",
      mapping: "store_name",
    },
    {
      name: "State",
      mapping: "state_name"
    },
    {
      name: "City",
      mapping: "city_name"
    },
    {
      name: "Phone",
      mapping: "mobile_number"
    },
    {
      name: "Status",
      mapping: null,
      fn: item =>
        <Toggle
          value={item.is_active}
          onChange={(toggleStatus) => {
            const updatePromoterStatusReq = {
              id: item.id,
              is_active: toggleStatus
            }
            mountModal(ConfirmModal({
              title: `${toggleStatus ? "Activate" : "Deactivate"} promoter`,
              message: `Are you sure you want to ${toggleStatus ? "activate" : "deactivate"} this promoter?`,
              handleConfirm: () => {
                unmountModal()
                updatePromoterStatus(updatePromoterStatusReq)
                  .then(updatePromoterStatusRes => {
                    alert(updatePromoterStatusRes.message)
                    setToggleData(!toggleData)
                  })
                  .catch(err => {
                    err.response().then(json => { alert(json.message) })
                  })
              }
            }))
          }}
        />
    },
    {
      name: null,
      mapping: null,
      fn: item => <Button appearance="secondary" size="small" onClick={() => {
        mountModal(EditPromoter({ id: item.id, name: item.name, history: props.history }))
      }}>Edit</Button>
    }
  ]

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <PageHeading>Promoters List</PageHeading>
        <div style={{ paddingBottom: "20px", marginLeft: "20px" }}>
          <Button appearance="primary" onClick={() => {
            mountModal(CreateNewPromoter({ history: props.history }))
          }}>Create Promoter</Button>
        </div>
      </div>
      <Table
        data={promoters}
        columns={tableColumns}
        isLoaded={isLoaded}
      />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={limit}
        totalItemsCount={promotersCount}
        pageRangeDisplayed={5}
        onChange={(active) => {
          handlePageUrl(searchValue, active)
          setActiveOffset(getOffsetUsingPageNo(active, limit))
          setActivePage(active)
        }}
      />
    </div>
  )
}
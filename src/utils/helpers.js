export function getOffsetUsingPageNo(pageNo, itemsCountPerPage) {
  return itemsCountPerPage * (pageNo - 1)
}

export function getQueryParamByName(name, query = location.search.slice(1)) {
  const queryObj = query.split("&").reduce((a, b) => {
    if (b.split("=")[1] == 'true' || b.split("=")[1] == 'false') {
      a[b.split("=")[0]] = JSON.parse(b.split("=")[1])
    } else {
      a[b.split("=")[0]] = b.split("=")[1]
    }
    return a
  }, {})

  return queryObj[name]
}

export function getQueryUri(queryObj) {
  const queryUri = Object.entries(queryObj).map(obj => obj.join('=')).join('&')
  return "?" + queryUri
}

export function getPositionBasedOnContainer(el) {
  const { top, bottom, left, right } = el.getBoundingClientRect()
  const containerScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  return {
    top: top + containerScrollPos,
    bottom: bottom + containerScrollPos,
    left: left,
    right: right
  }
}

export function formatStateAndCityList(data) {
  const list = data
  let cityList = [], stateList = [], stateMap = {}
  let index = 0;
  for (const i in list) {
    //state list
    let state = {}
    state.text = list[i].state_name
    state.value = list[i].state_id
    stateList[i] = state

    //city list
    for (const j in list[i].cities) {
      let city = {}
      city.text = (list[i].cities[j].city_name)
      city.value = (list[i].cities[j].city_id)
      cityList[index] = city
      index = index + 1
    }
  }

  //Maps state to city
  for (const i in list) {
    let cityList = []
    for (const j in list[i].cities) {
      let cityDetail = {}
      cityDetail.text = (list[i].cities[j].city_name)
      cityDetail.value = (list[i].cities[j].city_id)
      cityList[j] = cityDetail
    }
    stateMap[list[i].state_id] = cityList
  }
  console.log("statelist", stateList, "citylist", cityList, "statemap", stateMap)
  return { stateList, cityList, stateMap }
}

export const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
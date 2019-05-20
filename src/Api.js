import { POST, GET } from "Utils/fetch";

export function authLogin(req) {
  return POST({
    api: "/login",
    apiBase: "auth",
    type: "Public",
    data: req
  })
}

export function authLogout(req) {
  return GET({
    api: "/user/logout",
    apiBase: "auth",
    type: "Public"
  })
}

export function authTokenInfo(req) {
  return GET({
    api: "/user/account/info",
    apiBase: "auth",
    type: "Public",
  })
}

export function fetchPromoters(req) {
  return POST({
    api: "/Api/promoter/list",
    apiBase: "promoter",
    data: req
  })
    .then(json => json);
}

export function updatePromoterStatus(req) {
  return POST({
    api: "/Api/promoter/modify_status",
    apiBase: "promoter",
    data: req
  })
    .then(json => json)
}

export function createPromoter(req) {
  return POST({
    api: "/Api/promoter/create",
    apiBase: "promoter",
    data: req
  })
    .then(json => json)
}

export function fetchConsumerDetail(req) {
  return GET({
    api: `/Api/consumer/details/${req.consumer_id}`,
    apiBase: "customer"
  })
    .then(json => json)
}

export function fetchRetailers(req) {
  return POST({
    api: "/Api/listRetailers",
    apiBase: "retailer",
    data: req
  })
    .then(json => json)
}

export function fetchStatesandCities(req) {
  return POST({
    api: "/Api/listStates",
    apiBase: "retailer",
    data: req
  })
    .then(json => json)
}

export function editPromoter(req) {
  return POST({
    api: "/Api/promoter/edit",
    apiBase: "promoter",
    data: req
  })
    .then(json => json)
}
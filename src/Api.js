import { POST, GET } from "Utils/fetch";

export function authLogin(req) {
  return POST({
    api: "/login",
    apiBase: "auth",
    data: req
  })
}

export function authLogout(req) {
  return GET({
    api: "/user/logout",
    apiBase: "auth"
  })
}

export function authTokenInfo(req) {
  return GET({
    api: "/user/account/info",
    apiBase: "auth"
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
    apiBase: "retailer"
  })
    .then(json => json)
}

export function fetchStates(req) {
  return POST({
    api: "/Api/listStates",
    apiBase: "retailer"
  })
    .then(json => json)
}
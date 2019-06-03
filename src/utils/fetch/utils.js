import { getSession } from "../session";

/**
 * utility methods for constructing `Fetch` API
 */

/**
 * Helper methods to create window.fetch instance
 */

const getToken = () => ({
  // "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
  "x-hasura-role": getSession() ? getSession().hasura_role : null
})

function getHeaders(type) {
  const json_headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

  switch (type) {
    case "FormData":
      return getToken()
    case "Public":
      return Object.assign({}, json_headers)
    case "RSS":
      return Object.assign({}, { "Accept": "application/xml", "Content-Type": "application/xml" })
    default:
      return Object.assign({}, json_headers, getToken())
  }
}


/**
 * fetch data constructor(s)
 */
function constructBody({ type, data }) {
  switch (type) {
    case "FormData":
      return data

    default:
      return JSON.stringify(data)
  }
}

/**
 * Error handling helpers
 */
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 305) {
    return response
  }

  // return response
  else {
    //console.log(response.statusText);
    var error = new Error(response.statusText)
    //console.log("res", response)
    //var error = new Error(response.error)
    error.response = response
    throw error
  }
}

/**
 * constructFetchUtility - return a window.fetch instance
 * @param {Object} options
 */
export function constructFetchUtility(options) {

  const { api, data, method, type, prependBaseUrl = true, apiBase } = options
  // construct request url
  const url = prependBaseUrl ? `https://${apiBase}.${process.env.BASE_URL}${api}` : api

  // construct options for creating `window.fetch` instance
  let fetchOptions = {
    method,
    credentials: "include",
    headers: getHeaders(type),
  }

  // add data to request
  if (data && method !== "GET") {
    fetchOptions.body = constructBody({ type, data })
  }

  return fetch(url, fetchOptions)
    .then(checkStatus)
    .then(parseJSON)
}

function parseJSON(response) {
  return response.json()
}

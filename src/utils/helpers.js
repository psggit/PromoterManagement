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
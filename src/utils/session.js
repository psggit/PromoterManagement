export function clearSession() {
  localStorage.removeItem("__hipbarU__")
}

export function createSession(user) {
  const __hipbarU__ = {
    hasura_id: user.hasura_id,
    hasura_role: getHasuraRole(user.hasura_roles)
  }
  localStorage.setItem("__hipbarU__", JSON.stringify(__hipbarU__))
}

export function getSession() {
  return JSON.parse(localStorage.getItem("__hipbarU__"))
}

export function getHasuraRole(hasuraRoles) {
  const rolesMap = {
    admin: 8,
    opdataadmin: 7,
    opdataentry: 6,
    support_admin: 5,
    support_master: 4,
    promoter: 3,
    user: 1
  }
  let maxRole = rolesMap["user"]
  let xHasuraRole = "user"
  for (let i = 0; i < hasuraRoles.length; i++) {
    if (maxRole <= rolesMap[hasuraRoles[i]]) {
      maxRole = rolesMap[hasuraRoles[i]]
      xHasuraRole = hasuraRoles[i]
    }
  }
  return xHasuraRole
}
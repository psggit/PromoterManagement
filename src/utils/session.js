export function clearSession() {
  localStorage.removeItem("__hipbar-U")
}

export function createSession(user) {
  localStorage.setItem("__hipbar-U", user)
}

export function getSession() {
  return JSON.parse(localStorage.getItem("__hipbar-U"))
}
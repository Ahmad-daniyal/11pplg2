function get(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function remove(key) {
  localStorage.removeItem(key)
}

function getSession(key, fallback) {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function setSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

function removeSession(key) {
  sessionStorage.removeItem(key)
}

export const storage = { get, set, remove, getSession, setSession, removeSession }
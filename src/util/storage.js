import UserService from "../services/UserService";

const cookieName = process.env.REACT_APP_COOKIE_NAME;

export function getCookie() {
  if (!cookieName) {
    console.error('ERROR: Could not retrieve cookie. No cookie name found in environment.');
    return null;
  }

  try {
    const valueStr = localStorage.getItem(cookieName);
    if (valueStr) {
      return JSON.parse(valueStr);
    }
    return null;
  } catch (err) {
    return null;
  }
}

export function setCookie(obj) {
  if (!cookieName) {
    console.error("Error: Cookie name is missing");
  }

  try {
    localStorage.setItem(cookieName, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
  }
}

export function removeCookie() {
  localStorage.removeItem(cookieName);
  UserService.deleteUserSession();
  window.location.reload();
}

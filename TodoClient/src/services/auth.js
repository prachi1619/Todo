import PrincipalService from "./principal.service";
let _authToken = undefined;

async function authorize(force) {
  try {
    await PrincipalService.identity(force);
    let isAuthenticated = await PrincipalService.isAuthenticated();
    const location = window.location;
    if (isAuthenticated && (location.pathname === "/login" || location.pathname === "/signup")) {
      window.location.href = "/dashboard";
    }
    if (isAuthenticated) {
      //Redirect to accessdenied page
    } else {
      if (location.pathname !== "/login") {
        location.href = "/login";
      }
    }
  } catch (err) {
    console.error("Failed to get identity", err);
  }
}

function cleanAuth() {
  saveAuthorizationToken();
  PrincipalService.clear();
}

async function getAuthorizationToken() {
  if (_authToken === undefined) _authToken = await get("auth");
  // _authToken = sessionStorage.getItem("auth");
  return _authToken;
}

function saveAuthorizationToken(authToken) {
  save("auth", authToken);
  // sessionStorage.setItem("auth", authToken);
  _authToken = authToken;
}

const save = (key, value) => {
  localStorage.setItem(key, value);
};

const get = (key) => {
  let data = localStorage.getItem(key);
  return data;
};

const remove = (key) => {
  localStorage.removeItem(key);
};

const Auth = {
  authorize,
  getAuthorizationToken,
  saveAuthorizationToken,
  cleanAuth,
  remove,
};

export default Auth;

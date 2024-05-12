import PrincipalState from "./principal.state";
import TLinkApi from "./tlink.api";

async function identity(force) {
  if (force === true) PrincipalState.setIdentity(undefined);
  if (typeof PrincipalState.getIdentity() != "undefined") return PrincipalState.getIdentity();
  try {
    const data = await TLinkApi.get("/users/current");
    PrincipalState.setIdentity(data);
    return data;
  } catch (err) {
    return PrincipalState.setIdentity();
  }
}

function isAuthenticated() {
  return PrincipalState.isAuthenticated();
}

function clear() {
  PrincipalState.clear();
}

const PrincipalService = {
  identity,
  isAuthenticated,
  clear,
};

export default PrincipalService;

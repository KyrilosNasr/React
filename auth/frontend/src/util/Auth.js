import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const sotredExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(sotredExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
export function getAuthToken() {
    const token = localStorage.getItem("token");
    const tokenDuration = getTokenDuration();
    if (!token) {
        return null;
    }
    if (tokenDuration < 0) {
        return 'session Expired'
    }
  return token;
}

export const loaderFn = () => {
  return getAuthToken();
};

export function checkAuthLoader() {
  // this function will be added in the next lecture
  // make sure it looks like this in the end
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}

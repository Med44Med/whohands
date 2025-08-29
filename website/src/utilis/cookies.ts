import Cookies from "js-cookie";

export default function handleUserCookies() {
  const cookies = Cookies.get();
  if (!cookies.cookies_access) {
    return null;
  } else if ((cookies.cookies_access = "denied")) {
    return { status: "success" };
  } else {
    return { status: "denied" };
  }
}

function get_domain() {
  if (window.location.hostname === "localhost") {
    return "http://0.0.0.0:8000";
  } else {
    return "http://192.168.43.207:8000";
  }
}

export const DOMAIN = get_domain();

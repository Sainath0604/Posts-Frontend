export function getServerUrl() {
  return import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_SERVER
    : "http://localhost:3000";
}

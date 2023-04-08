import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmY0OWVmYzlhODk2ZjllYWY4ZTQ2ZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MTkzMjY4NiwiZXhwIjoxNjYyMTkxODg2fQ.OHbsUH62Krk_wpo1VJmadFcE2YWAh_oObSfNVvB8EaU";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: "Bearer " + TOKEN },
});

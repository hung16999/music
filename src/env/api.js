import axios from "axios"

const ipConfig = `192.168.1.49`

const API = axios.create({
  baseURL: `http://${ipConfig}/be_music/`,
})

export default API

import axios from "axios";

export default axios.create({
  baseURL: "https://librar-crud-mern-server.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
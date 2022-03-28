import http from "http-common";

const getAll = () => {
  return http.get("/libraries");
};
const get = (id) => {
  return http.get(`/libraries/${id}`);
};
const create = (data) => {
  return http.post("/libraries", data);
};
const update = (id, data) => {
  return http.put(`/libraries/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/libraries/${id}`);
};
const removeAll = () => {
  return http.delete(`/libraries`);
};
const findByTitle = (title) => {
  return http.get(`/libraries?title=${title}`);
};
const LibraryService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default LibraryService;
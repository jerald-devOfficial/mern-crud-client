import {
    CREATE_LIBRARY,
    RETRIEVE_LIBRARIES,
    UPDATE_LIBRARY,
    DELETE_LIBRARY,
    DELETE_ALL_LIBRARIES
  } from "./types";
  
  import LibraryDataService from "services/LibraryService";
  
  export const createLibrary = (title, description) => async (dispatch) => {
    try {
      const res = await LibraryDataService.create({ title, description });
  
      dispatch({
        type: CREATE_LIBRARY,
        payload: res.data
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveLibraries = () => async (dispatch) => {
    try {
      const res = await LibraryDataService.getAll();
  
      dispatch({
        type: RETRIEVE_LIBRARIES,
        payload: res.data
      });
      console.log("res: ", res);
    } catch (err) {
      console.log("err: ", err.message);
    }
  };
  
  export const updateLibrary = (id, data) => async (dispatch) => {
    try {
      const res = await LibraryDataService.update(id, data);
  
      dispatch({
        type: UPDATE_LIBRARY,
        payload: data
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteLibrary = (id) => async (dispatch) => {
    try {
      await LibraryDataService.remove(id);
  
      dispatch({
        type: DELETE_LIBRARY,
        payload: { id }
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllLibraries = () => async (dispatch) => {
    try {
      const res = await LibraryDataService.removeAll();
  
      dispatch({
        type: DELETE_ALL_LIBRARIES,
        payload: res.data
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findLibrariesByTitle = (title) => async (dispatch) => {
    try {
      const res = await LibraryDataService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_LIBRARIES,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };
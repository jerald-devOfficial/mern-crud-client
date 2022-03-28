import {
    CREATE_LIBRARY,
    RETRIEVE_LIBRARIES,
    UPDATE_LIBRARY,
    DELETE_LIBRARY,
    DELETE_ALL_LIBRARIES
  } from "actions/types";
  
  const initialState = [];
  
  const libraryReducer = (libraries = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case CREATE_LIBRARY:
        return (libraries.libraries = [payload]);
  
      case RETRIEVE_LIBRARIES:
        return payload;
  
      case UPDATE_LIBRARY:
        return libraries.libraries.map((library) => {
          if (library.id === payload.id) {
            return {
              ...library,
              ...payload
            };
          } else {
            return library;
          }
        });
  
      case DELETE_LIBRARY:
        return libraries.libraries.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_LIBRARIES:
        return [];
      default:
        return libraries;
    }
  };
  
  export default libraryReducer;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveLibraries, findLibrariesByTitle, deleteAllLibraries } from "actions/libraries";
import { Link } from "react-router-dom";

const LibrariesList = () => {
  const [currentLibrary, setCurrentLibrary] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const __libraries = useSelector((state) => state.libraries);
  console.log("libraries: ", __libraries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveLibraries());
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentLibrary(null);
    setCurrentIndex(-1);
  };

  const setActiveLibrary = (library, index) => {
    setCurrentLibrary(library);
    setCurrentIndex(index);
  };

  const removeAllLibraries = () => {
    dispatch(deleteAllLibraries())
      .then((response) => {
        console.log(response);
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findLibrariesByTitle(searchTitle));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={findByTitle}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Libraries List</h4>

        <ul className="list-group">
          {__libraries &&
            __libraries.libraries &&
            __libraries.libraries.map((library, index) => (
              <li
                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                onClick={() => setActiveLibrary(library, index)}
                key={index}
              >
                {library.title}
              </li>
            ))}
        </ul>

        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllLibraries}>
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentLibrary ? (
          <div>
            <h4>Library</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentLibrary.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentLibrary.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentLibrary.published ? "Published" : "Pending"}
            </div>

            <Link to={"/libraries/" + currentLibrary.id} className="badge badge-warning">
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Library...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibrariesList;
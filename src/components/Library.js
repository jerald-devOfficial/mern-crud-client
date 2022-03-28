import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateLibrary, deleteLibrary } from "actions/libraries";
import LibraryDataService from "services/LibraryService";

const Library = (props) => {
  const initialLibraryState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentLibrary, setCurrentLibrary] = useState(initialLibraryState);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const getLibrary = (id) => {
    LibraryDataService.get(id)
      .then((response) => {
        setCurrentLibrary(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getLibrary(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentLibrary({ ...currentLibrary, [name]: value });
  };

  const updateStatus = (status) => {
    const data = {
      id: currentLibrary.id,
      title: currentLibrary.title,
      description: currentLibrary.description,
      published: status
    };
    dispatch(updateLibrary(currentLibrary.id, data))
      .then((response) => {
        console.log(response);
        setCurrentLibrary({ ...currentLibrary, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateLibrary(currentLibrary.id, currentLibrary))
      .then((response) => {
        console.log(response);

        setMessage("The library was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const removeLibrary = () => {
    dispatch(deleteLibrary(currentLibrary.id))
      .then(() => {
        props.history.push("/libraries");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentLibrary ? (
        <div className="edit-form">
          <h4>Library</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentLibrary.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentLibrary.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentLibrary.published ? "Published" : "Pending"}
            </div>
          </form>
          {currentLibrary.published ? (
            <button className="badge badge-primary mr-2" onClick={() => updateStatus(false)}>
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2 text-danger"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}
          <button className="badge badge-danger mr-2 text-secondary" onClick={removeLibrary}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success text-primary"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Library...</p>
        </div>
      )}
    </div>
  );
};

export default Library;
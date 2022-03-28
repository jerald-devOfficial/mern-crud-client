import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createLibrary } from "actions/libraries";

const AddLibrary = () => {
  const initialLibraryState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [library, setLibrary] = useState(initialLibraryState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLibrary({ ...library, [name]: value });
  };

  const saveLibrary = () => {
    const { title, description } = library;

    dispatch(createLibrary(title, description))
      .then((data) => {
        setLibrary({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published
        });
        setSubmitted(true);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const newLibrary = () => {
    setLibrary(initialLibraryState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newLibrary}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={library.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={library.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <button onClick={saveLibrary} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddLibrary;
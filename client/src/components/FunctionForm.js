import React, { useState } from "react";

const FunctionForm = ({ state, handleFormSubmission, handleSelect }) => {
  const [input, setInput] = useState({
    id: "",
    name: "",
    bio: "",
    err: null,
    message: ""
  });
  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      err: null,
      message: ""
    });
  };

  const handleSelectChange = e => {
    handleSelect(e.target.options[e.target.selectedIndex].value);
    setInput({ id: "", name: "", bio: "", err: null, message: "" });
  };

  const handleSubmit = (e, id, name, bio) => {
    e.preventDefault();
    setInput({ id: "", name: "", bio: "", err: null, message: "" });

    switch (e.target.textContent) {
      case "GET BY ID":
        id === "" || id === null
          ? setInput({
              ...input,
              err: true,
              message: "Please complete all fields"
            })
          : handleFormSubmission({
              text: state.buttonText,
              id: id,
              name: "",
              bio: ""
            });
        break;
      case "CREATE":
        name === "" || bio === ""
          ? setInput({
              ...input,
              err: true,
              message: "Please complete all fields..."
            })
          : handleFormSubmission({
              text: state.buttonText,
              name: input.name,
              bio: input.bio
            });
        break;
      default:
        break;
    }
  };

  return (
    <div className="form-wrapper">
      <form>
        <select name="" id="" onChange={handleSelectChange}>
          <option value={0}>Make a selection...</option>
          <option value="GET">Get All Users</option>
          <option value="GET BY ID">Get User by ID</option>
          <option value="CREATE">Create New User</option>
        </select>
        {state.buttonText === "" || (state.buttonText === "GET" && null)}
        {state.buttonText === "GET BY ID" && (
          <>
            <input
              type="text"
              name="id"
              value={input.id}
              placeholder="Enter a user ID..."
              onChange={handleChange}
            />
            <button onClick={e => handleSubmit(e, input.id)}>
              {state.buttonText}
            </button>
          </>
        )}
        {state.buttonText === "CREATE" && (
          <>
            <input
              type="text"
              name="name"
              value={input.name}
              placeholder="Enter user's name to create..."
              onChange={handleChange}
            />
            <textarea
              name="bio"
              value={input.bio}
              placeholder="Enter user's bio to create..."
              onChange={handleChange}
              style={{ resize: "vertical" }}
            />
            <button onClick={e => handleSubmit(e, null, input.name, input.bio)}>
              {state.buttonText}
            </button>
          </>
        )}

        {input.err && <div className={`message red`}>{input.message}</div>}
        {state.message.success !== null && (
          <div
            className={`message ${
              state.message.success && state.message.success === true
                ? "green"
                : "red"
            }`}
          >
            {state.message.output}
          </div>
        )}
      </form>
    </div>
  );
};

export default FunctionForm;

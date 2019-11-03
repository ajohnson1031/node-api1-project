import React, { useState } from "react";
import { Card, Icon } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";
import "semantic-ui-css/semantic.min.css";

const UserCard = ({ id, name, bio, handleFormSubmission }) => {
  const [info, setInfo] = useState({ name: name, bio: bio, show: "hide" });

  const handleChange = e =>
    setInfo({ ...info, [e.target.name]: e.target.value });

  const handleClick = e =>
    e.target.className.includes("edit")
      ? null
      : handleFormSubmission({ text: "DELETE", id: id });

  const handleVisibility = () =>
    info.show === "hide"
      ? setInfo({ ...info, show: "show" })
      : setInfo({ ...info, show: "hide" });

  const handleSubmission = (e, name, bio) => {
    e.preventDefault();
    handleFormSubmission({ text: "UPDATE", id: id, name: name, bio: bio });
  };

  return (
    <Card className="usercard">
      <Card.Content className={`user-editor ${info.show}`}>
        <Icon
          name="close"
          className="edit-close"
          data-tip="Close Editor"
          onClick={handleVisibility}
        />
        <h4>Edit User Info</h4>
        <input
          type="text"
          name="name"
          value={info.name}
          onChange={handleChange}
        />
        <textarea
          name="bio"
          id=""
          rows="3"
          value={info.bio}
          onChange={handleChange}
        ></textarea>
        <button onClick={e => handleSubmission(e, info.name, info.bio)}>
          UPDATE
        </button>
      </Card.Content>
      <Icon
        name="pencil"
        className="edit"
        data-tip="Edit User Info"
        onClick={handleVisibility}
      ></Icon>
      <Icon
        name="close"
        className="delete"
        onClick={handleClick}
        data-tip="Delete User"
      ></Icon>
      <ReactTooltip place="top" type="info" effect="float" />
      <h3>{name}</h3>
      <p>{bio}</p>
      <Card.Meta>User ID: {id}</Card.Meta>
    </Card>
  );
};

export default UserCard;

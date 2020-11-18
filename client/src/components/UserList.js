import React from "react";
import UserCard from "./UserCard";

const UserList = ({ state, handleFormSubmission }) => {
  return (
    <div className="user-container">
      {state.users &&
        state.users.map(user => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            bio={user.bio}
            handleFormSubmission={handleFormSubmission}
          />
        ))}
    </div>
  );
};

export default UserList;

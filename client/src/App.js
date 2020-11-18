import React from "react";
import { connect } from "react-redux";
import FunctionForm from "./components/FunctionForm";
import UserList from "./components/UserList";
import { handleSelect, handleFormSubmission } from "./actions";

function App({ state, handleSelect, handleFormSubmission }) {
  return (
    <div className="App">
      <h1>User Database</h1>

      <FunctionForm
        state={state}
        handleFormSubmission={handleFormSubmission}
        handleSelect={handleSelect}
      />
      {state.users && (
        <UserList state={state} handleFormSubmission={handleFormSubmission} />
      )}
    </div>
  );
}

const mapStateToProps = state => ({ state: state });

export default connect(
  mapStateToProps,
  { handleSelect, handleFormSubmission }
)(App);

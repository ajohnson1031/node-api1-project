import axios from "axios";

export const HANDLE_SELECT = "HANDLE_SELECT";
export const HANDLE_FORM_SUBMISSION = "HANDLE_FORM_SUBMISSION";
export const FORM_SUBMISSION_FAIL = "FORM_SUBMISSION_FAIL";

export const handleFormSubmission = ({ text, id, name, bio }) => dispatch => {
  switch (text) {
    case "":
      dispatch({
        type: HANDLE_FORM_SUBMISSION,
        payload: { text: "" }
      });
      break;
    case "GET BY ID":
      axios
        .get(`http://localhost:4000/users/${id}`)
        .then(res => {
          dispatch({
            type: HANDLE_FORM_SUBMISSION,
            payload: {
              text: text,
              users: [res.data.user],
              message: {
                success: null,
                output: null
              }
            }
          });
        })
        .catch(err => {
          dispatch({
            type: FORM_SUBMISSION_FAIL,
            payload: err.response.data.message
          });
        });
      break;
    case "CREATE":
      axios
        .post("http://localhost:4000/users", { name: name, bio: bio })
        .then(res => {
          dispatch({
            type: HANDLE_FORM_SUBMISSION,
            payload: {
              text: text,
              message: {
                success: true,
                output: "New user successfuly created!"
              }
            }
          });
        })
        .catch(err => {
          dispatch({
            type: FORM_SUBMISSION_FAIL,
            payload: err.response.data.message
          });
        });
      break;
    case "UPDATE":
      axios
        .put(`http://localhost:4000/users/${id}`, { name: name, bio: bio })
        .then(res =>
          dispatch({
            type: HANDLE_FORM_SUBMISSION,
            payload: {
              text: text,
              message: {
                success: null,
                output: null
              }
            }
          })
        )
        .catch(err => {
          dispatch({
            type: FORM_SUBMISSION_FAIL,
            payload: err.response.data.errorMessage
          });
        })
        .finally(res =>
          axios
            .get("http://localhost:4000/users")
            .then(res => {
              dispatch({
                type: HANDLE_FORM_SUBMISSION,
                payload: {
                  text: "GET",
                  users: res.data.users,
                  message: {
                    success: true,
                    output: "User info updated!"
                  }
                }
              });
            })
            .catch(err => {
              dispatch({
                type: FORM_SUBMISSION_FAIL,
                payload: err.response.data.message
              });
            })
        );
      break;
    case "DELETE":
      axios
        .delete(`http://localhost:4000/users/${id}`)
        .then(res => {
          dispatch({
            type: HANDLE_FORM_SUBMISSION,
            payload: {
              text: text,
              message: {
                success: null,
                output: null
              }
            }
          });
        })
        .catch(err => {
          dispatch({
            type: FORM_SUBMISSION_FAIL,
            payload: err.response.data.message
          });
        })
        .finally(res =>
          axios
            .get("http://localhost:4000/users")
            .then(res => {
              dispatch({
                type: HANDLE_FORM_SUBMISSION,
                payload: {
                  text: "GET",
                  users: res.data.users,
                  message: {
                    success: true,
                    output: "User has been deleted!"
                  }
                }
              });
            })
            .catch(err => {
              dispatch({
                type: FORM_SUBMISSION_FAIL,
                payload: err.response.data.message
              });
            })
        );
      break;
    default:
      break;
  }
};

export const handleSelect = value => dispatch => {
  const trueValue = value === "0" ? "" : value;
  trueValue === "GET"
    ? axios
        .get("http://localhost:4000/users")
        .then(res => {
          dispatch({
            type: HANDLE_FORM_SUBMISSION,
            payload: {
              text: trueValue,
              users: res.data.users,
              message: {
                success: null,
                output: null
              }
            }
          });
        })
        .catch(err => {
          dispatch({ type: FORM_SUBMISSION_FAIL, payload: err });
        })
    : dispatch({ type: HANDLE_SELECT, payload: trueValue });
};

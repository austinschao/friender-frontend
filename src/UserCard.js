import userContext from "./userContext";
import { useContext, useState } from "react";
function UserCard({ user, handleMatch, handleReject }) {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [disabled, setDisabled] = useState(false);

  function handleClickMatch() {
    setDisabled(true);
    handleMatch(currentUser.username, user.username);
    setDisabled(false);
  }

  function handleClickReject() {
    setDisabled(true);
    handleMatch(currentUser.username, user.username);
    setDisabled(false);
  }

  // console.log(user);
  // Have to change default image to a URL so it can be displayed
  // Need to show a link to display list of messages between each other
  // Include a button to add a message that will send a post request to API
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={user.image_url} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{user.first_name}</h5>
            <ul>
              <li className="card-text">Interests: {user.interests.replace(/[\[\]']+/g, '')}</li>
              <li className="card-text">Hobbies: {user.hobbies.replace(/[\[\]']+/g, '')}</li>
            </ul>
            <div className="d-flex justify-content-center">
              <button disabled={disabled} className="btn btn-success btn-sm mx-1" onClick={handleClickMatch}>Match</button>
              <button disabled={disabled} className="btn btn-danger btn-sm mx-1" onClick={handleClickReject}>Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
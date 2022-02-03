import React, { useState } from "react";
import { useGlobalContext } from "../../../context/globalContext";
import { DeleteModal } from "../../../components";
import { FormInput, Alert } from "../../../components";
import "./UserProfile.css";

const UserProfile = () => {
  const {
    user,
    updateUser,
    showAlert,
    displayAlert,
    isLoading,
    toggleDeleteModal,
  } = useGlobalContext();

  const initialProfileState = {
    name: user ? user.name : null,
    homeTown: user ? user.homeTown : null,
    currentLocation: user ? user.currentLocation : null,
    zodiacSign: user ? user.zodiacSign : null,
  };

  const [userStats, setUserStats] = useState(initialProfileState);

  const handleChange = (e) => {
    setUserStats({ ...userStats, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, homeTown, currentLocation, zodiacSign } = userStats;

    if (!name || !homeTown || !currentLocation || !zodiacSign) {
      displayAlert();
      return;
    }
    updateUser({ name, homeTown, currentLocation, zodiacSign });
  };

  return (
    <main className="profile-main">
      <form onSubmit={handleSubmit} className="form profile-form">
        {showAlert && <Alert />}
        <div className="profile-form-container">
          <FormInput
            type="text"
            name="name"
            value={userStats.name}
            handleChange={handleChange}
          />
          <FormInput
            type="text"
            name="zodiacSign"
            value={userStats.zodiacSign}
            handleChange={handleChange}
          />

          <FormInput
            type="text"
            name="homeTown"
            value={userStats.homeTown}
            handleChange={handleChange}
          />
          <FormInput
            type="text"
            name="currentLocation"
            value={userStats.currentLocation}
            handleChange={handleChange}
          />
          <button className="btn save-changes-btn" disabled={isLoading}>
            {isLoading ? "Processing..." : "Submit Changes"}
          </button>
        </div>
      </form>
      <button
        className="btn user-delete-btn logout-delete-account-btn-colors"
        onClick={toggleDeleteModal}
      >
        Delete Account
      </button>
      <DeleteModal />
    </main>
  );
};

export default UserProfile;

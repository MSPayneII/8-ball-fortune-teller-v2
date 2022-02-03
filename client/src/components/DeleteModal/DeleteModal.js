import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { FormInput } from "../../components";

import { FaTimes } from "react-icons/fa";
import "./DeleteModal.css";

const DeleteModal = () => {
  const { user, deleteUser, isDeleteModalOpen, toggleDeleteModal } =
    useGlobalContext();

  const [confirmation, setConfirmation] = useState("");

  const deleteConfirm = (e) => {
    e.preventDefault();

    // console.log("front end", user);
    deleteUser(user);
  };
  return (
    <div
      className={`${
        isDeleteModalOpen
          ? "delete-modal-overlay show-delete-modal"
          : "delete-modal-overlay"
      }`}
    >
      <div className="delete-modal-container">
        <button className="close-delete-modal-btn" onClick={toggleDeleteModal}>
          <FaTimes />
        </button>
        <h1 className="delete-modal-title">Are you sure?</h1>
        <p className="delete-modal-text">
          Type <span>DELETE</span> in the field below and click "Delete", or
          click "Cancel" if you've changed your mind.
        </p>
        <div className="delete-confirmation">
          <FormInput
            placeholder={"Delete"}
            handleChange={(e) => setConfirmation(e.target.value)}
            value={confirmation}
          />
        </div>
        <div className="delete-modal-btn-container">
          <button className="btn cancel-btn" onClick={toggleDeleteModal}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn delete-btn logout-delete-account-btn-colors"
            onClick={deleteConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
